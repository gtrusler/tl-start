/**
 * Temporary file upload endpoint
 * Uploads files to external service and returns URL
 */

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Create new FormData for the external service
    const externalFormData = new FormData()
    externalFormData.append('file', file)

    // Upload to external service
    const response = await fetch('https://nnn.lexpertcloud.com/webhook-test/upload-file', {
      method: 'POST',
      body: externalFormData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`)
    }

    const result = await response.json() as { 
      url?: string; 
      file_url?: string; 
      link?: string;
      [key: string]: any;
    }
    
    return NextResponse.json({
      success: true,
      url: result.url || result.file_url || result.link,
      filename: file.name,
      size: file.size,
      type: file.type,
      result
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { 
        error: 'File upload failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}