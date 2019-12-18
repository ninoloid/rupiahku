const getTagTypeId = type => {
  let data = {}
  switch (type) {
    case 'Gaji': { data.typeid = 1, data.tag = 'income' }
    case 'Uang Jajan': { data.typeid = 1, data.tag = 'income' }
    case 'Tabungan': { data.typeid = 1, data.tag = 'income' }
    case 'Hadiah': { data.typeid = 1, data.tag = 'income' }
    case 'Makan': { data.typeid = 1, data.tag = 'income' }
    case 'Belanja': { data.typeid = 1, data.tag = 'income' }
    case 'Menabung': { data.typeid = 1, data.tag = 'income' }
    case 'Hiburan': { data.typeid = 1, data.tag = 'income' }
  }
  return data
}

module.exports = getTagTypeId