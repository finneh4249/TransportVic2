import fs from 'fs'
import path from 'path'
import url from 'url'

let nameOverrides = {}
try {
  const filePath = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../transportvic-data/excel/stops/name-overrides.json')
  if (fs.existsSync(filePath)) {
    nameOverrides = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }
} catch (e) {}

export default stopName => {
  return nameOverrides[stopName] || stopName
}
