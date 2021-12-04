import xlsx from 'xlsx'

export default async function convertJsonToCsv(json, path) {
  const workSheet = xlsx.utils.json_to_sheet(json.map(p => p.toJSON()))
  const workBook = xlsx.utils.book_new()

  xlsx.utils.book_append_sheet(workBook, workSheet, 'products')

  xlsx.write(workBook, { bookType: 'xlsx', type: 'buffer' })
  xlsx.write(workBook, { bookType: 'xlsx', type: 'binary' })

  xlsx.writeFile(workBook, path)
}