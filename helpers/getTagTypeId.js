const getTagTypeId = type => {
  let data = {}
  switch (type) {
    case 'Gaji': { data.typeid = 1, data.tag = 'income' }; break;
    case 'Uang Jajan': { data.typeid = 2, data.tag = 'income' } break;
    case 'Tabungan': { data.typeid = 3, data.tag = 'income' } break;
    case 'Hadiah': { data.typeid = 4, data.tag = 'income' } break;
    case 'Makan': { data.typeid = 5, data.tag = 'expense' } break;
    case 'Belanja': { data.typeid = 6, data.tag = 'expense' } break;
    case 'Menabung': { data.typeid = 7, data.tag = 'expense' } break;
    case 'Hiburan': { data.typeid = 8, data.tag = 'expense' } break;
  }
  return data
}

module.exports = getTagTypeId