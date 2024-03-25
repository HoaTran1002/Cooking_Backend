import * as fs from 'node:fs'
export const deleteFile = async (path: string): Promise<void> => {
  fs.unlink(path, (err: any) => {
    // throw new Error(err.message)
    if (err) {
      console.log('loi loi')
      throw new Error(err.message)
    }
  })
}
export const updateFileContent = async (file: Express.Multer.File, outPutPath: string): Promise<void | string> => {
  if (!file.buffer) {
    throw new Error('No file data in memory')
  }
  fs.writeFile(outPutPath, file.buffer, 'utf8', (err: any) => {
    if (err) {
      throw new Error(`Error writing the file: ${err}`)
    } else {
      return 'File has been updated successfully'
    }
  })
  return 'File has been updated successfully'
}
