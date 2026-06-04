import { readFileSync } from 'fs'
import { join } from 'path'

const API_KEY = process.env.SUBSCRIBE_DEV_PLATFORM_API_KEY

if (!API_KEY) {
  console.error('❌ Missing SUBSCRIBE_DEV_PLATFORM_API_KEY environment variable')
  console.error('Please set your API key:')
  console.error('  export SUBSCRIBE_DEV_PLATFORM_API_KEY=your-key-here')
  process.exit(1)
}

async function deploy() {
  try {
    // Read project name from package.json
    const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))
    const projectName = packageJson.name

    console.log(`📦 Deploying ${projectName} to Subscribe.dev...`)

    // Step 1: Create ZIP file
    console.log('Creating ZIP file...')
    const proc = Bun.spawn(['zip', '-r', 'deploy.zip', 'public'], {
      cwd: process.cwd(),
      stdout: 'pipe'
    })
    await proc.exited

    // Step 2: Get presigned URLs
    console.log('Getting presigned upload URL...')
    const presignResponse = await fetch('https://platform.subscribe.dev/api/apps/presigned-url', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectName,
        fileType: 'application/zip'
      })
    })

    if (!presignResponse.ok) {
      throw new Error(`Failed to get presigned URL: ${await presignResponse.text()}`)
    }

    const { uploadUrl, fileKey } = await presignResponse.json()

    // Step 3: Upload ZIP to S3
    console.log('Uploading to S3...')
    const zipFile = Bun.file('deploy.zip')
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: await zipFile.arrayBuffer(),
      headers: {
        'Content-Type': 'application/zip'
      }
    })

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload: ${uploadResponse.statusText}`)
    }

    // Step 4: Deploy the app
    console.log('Deploying app...')
    const deployResponse = await fetch('https://platform.subscribe.dev/api/apps/deploy', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectName,
        fileKey: fileKey
      })
    })

    if (!deployResponse.ok) {
      throw new Error(`Failed to deploy: ${await deployResponse.text()}`)
    }

    const result = await deployResponse.json()

    console.log('✅ Deployment successful!')
    console.log(`🌐 Live URL: ${result.url}`)

    // Cleanup
    await Bun.$`rm deploy.zip`

  } catch (error) {
    console.error('❌ Deployment failed:', error)
    process.exit(1)
  }
}

deploy()
