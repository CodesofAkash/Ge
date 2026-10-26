import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.name.replace(/\s+/g, '_');
    
    // Save to public/uploads directory
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({ 
      success: true, 
      filename: filename,
      url: `/uploads/${filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' });
  }
}
