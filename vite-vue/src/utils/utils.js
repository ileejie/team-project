import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
// 防抖
export const debounce = (fn, delay, immediate) => {
  let timer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    // immediate防抖是否立即执行
    if (immediate) {
      let callNow = !timer; // 第一次会立即执行，以后只有事件执行后才会再次触发
      timer = setTimeout(function () {
        timer = null;
      }, delay)
      if (callNow) fn()
    }
    else {
      timer = setTimeout(() => {
        fn()
      }, delay)
    }
  }
}

// 节流
export const throttled = (fn, delay) => {
  let timer = null
  let starttime = Date.now()
  return () => {
    let curTime = Date.now() // 当前时间
    let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
    clearTimeout(timer)
    if (remaining <= 0) {
      fn()
      starttime = Date.now()
    } else {
      timer = setTimeout(fn, remaining);
    }
  }
}

// 获取当前时间、日期
export const formatDate = (format) => {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth()
  month = month < 10 ? `0${month}` : month
  let day = date.getDate()
  day = day < 10 ? `0${day}` : day
  let hour = date.getHours()
  hour = hour < 10 ? `0${hour}` : hour
  let minute = date.getMinutes()
  minute = minute < 10 ? `0${minute}` : minute
  let second = date.getSeconds()
  second = second < 10 ? `0${second}` : second
  let value = ''
  switch(format) {
    case 'yyyy-MM-dd HH:mm:ss':
      value = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      break
    case 'yyyy-MM-dd HH:mm':
      value = `${year}-${month}-${day} ${hour}:${minute}`
      break
    case 'yyyy-MM-dd':
      value = `${year}-${month}-${day}`
      break
    case 'HH:mm:ss':
      value = `${hour}:${minute}:${second}`
      break
    case 'HH:mm':
      value = `${hour}:${minute}`
      break
    default:
      value = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      break
  }
  return value
}

// 时间戳、日期相互转换
export const dateTimestamp = (val) => {
  let target = ''
  // 将参数进行乘法运算，若参数是时间戳则返回number类型的时间戳，否则返回NaN
  if (Number.isNaN(val * 1)) {
    const date = new Date(val.replace(/-/g, '/'))
    target = date.getTime()
  } else {
    const date = new Date(val)
    const year = date.getFullYear()
    let month = date.getMonth()
    month = month < 10 ? `0${month}` : month
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    let hour = date.getHours()
    hour = hour < 10 ? `0${hour}` : hour
    let minute = date.getMinutes()
    minute = minute < 10 ? `0${minute}` : minute
    let second = date.getSeconds()
    second = second < 10 ? `0${second}` : second
    target = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
  return target
}

// 递归实现深拷贝
export const deepCopy = (origin) => {
  let target = Array.isArray(origin) ? [] : {}
  if (origin && typeof origin === 'object') {
    for (let k in origin) {
      //判断是引用值,但是不是数组类型的
      if (origin[k] && typeof (origin[k]) === 'object') {
        let obj = {}
        obj[k] = deepCopy(origin[k])
        //把原始对象拷贝给target,然后返回出去
        Object.assign(target, obj)
      } else {
        let obj = {}
        obj[k] = origin[k]
        //把原始对象拷贝给target,然后返回出去
        Object.assign(target, obj)
      }
    }
  }
  return target
}

// 获取url参数
export const getUrlParams = (url) => {
  const href = url || window.location.href
  const args = href.split('?')
  if (args[0] === href) {
    return ''
  }
  let hrefarr = args[1].split('#')[0].split('&');
  let obj = {}
  let temp = []
  for (let i = 0; i < hrefarr.length; i++) {
    temp = hrefarr[i].split('=')
    obj[temp[i][0]] = temp[i][1]
  }
  return obj
}

// 返回m到n的随机数
export const randomNumber = (m, n) => {
  return Math.round(m + Math.random() * (n - m))
}

// 获取随机颜色
export const randomColor = (type) => {
  let color = ''
  switch(type) {
    case 'rgb':
      color = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`
      break
    case 'hex':
      let index = 0
      let colorValue = ''
      for (let i = 0; i < 6; i++) {
        index = randomNumber(0, 15)
        colorValue += '0123456789abcdef'[index]
      }
      color = `#${colorValue}`
      break
    default:
      color = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`
      break
  }
  return color
}

// 随机字符码
export const randomCode = (count) => {
  // count 取值范围0--36, 从0开始到字母z
  return Math.random().toString(count).substring(2)
}

// 将金额转为大写
export const moneyToDigit = (val) => {
  let result = ''
  const fraction = ['角', '分', '厘']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  const head = val < 0 ? '负' : ''
  val = Math.abs(val)
  let str = ''
  for (let i = 0; i < fraction.length; i++) {
    str += (digit[Math.floor(val + 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  str = str || '整'
  val = Math.floor(val)
  for (let i = 0; i < unit[0].length && val > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && val > 0; j++) {
      p = digit[val % 10] + unit[1][j] + p
      val = Math.floor(val / 10)
    }
    str = p.replace(/(零.)零$/, '').replace(/^$/, '零') + unit[0][i] + str
  }
  result = head + str.replace(/(零.)零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
  return result
}

// 常用正则校验
export const validate = {
  isEmail: (val) => {
    // 校验邮箱
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g
    return reg.test(val)
  },
  isPhone: (val) => {
    // 校验手机号
    const reg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/g
    return reg.test(val)
  },
  isTel: (val) => {
    // 校验固定电话
    const reg = /\d{3}-\d{8}|\d{4}-\d{7}/g
    return reg.test(val)
  },
  isCardID: (val) => {
    // 校验身份证号码
    const reg = /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/g
    return reg.test(val)
  }
}

// 设置excel导出位置
const excelExportForArea = (colIndex) => {
  const ordA = 'A'.charCodeAt(0);
  const ordZ = 'Z'.charCodeAt(0);
  const len = ordZ - ordA + 1;
  let str = '';
  while (colIndex >= 0) {
    str = String.fromCharCode(colIndex % len + ordA) + str;
    colIndex = Math.floor(colIndex / len) - 1;
  }
  return str;
}

// 导出excel
/**
 * 
 * @param names 导出excel表头明数据
 * @param keys 表头对应的字段名称，与names的顺序保持一致
 * @param tableData 要导出的表格数据
 */
export const exportExcel = (names, keys, tableData, exportName) => {
  const columns = [];
  for (let i = 0; i < names.length; i++) {
    const excelCol = {};
    excelCol.key = keys[i];
    excelCol.width = 30;
    columns.push(excelCol);
  }
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('sheet1');
  const fileName = exportName + '.xlsx';
  workbook.created = new Date();
  workbook.modified = new Date();
  worksheet.columns = columns;
  const convert = [];
  let tempItem = {};
  tableData.forEach((item) => {
    tempItem = {};
    for (let tpk of keys) {
      tempItem[tpk] = item[tpk]
    }
    convert.push(tempItem);
  });
  worksheet.insertRows(1, convert);
  const colArray = [];
  const tableHead = [];
  let level = 1;
  let maxLevel = 1;
  names.forEach((obj, idx) => {
    tableHead.push({
      title: obj,
      horizontal: 'center',
      colspan: 1,
      rowspan: 1,
      level: level
    });
    colArray.push({
      letter: excelExportForArea(idx),
      horizontal: 'center',
      dataType: 'string',
      length: 0
    });
  });
  --level;
  for (let i = 0; i < tableHead.length; i++) {
    if (tableHead[i].level > maxLevel) {
      maxLevel = tableHead[i].level;
    }
  }
  for (let i = 0; i < tableHead.length; i++) {
    if (tableHead[i].rowspan + tableHead[i].level - 1 > maxLevel) {
      tableHead[i].rowspan = maxLevel - tableHead[i].level + 1;
    }
  }
  const excelCell = [];
  const rows = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < maxLevel; j++) {
      excelCell.push({
        xAxis: i,
        yAxis: j,
        isEdit: false
      });
    }
  }
  for (let i = 0; i < maxLevel; i++) {
    let x = 0;
    const row = [];
    for (let j = 0; j < tableHead.length; j++) {
      const index = excelCell.findIndex(function(value, index, arr) {
        return value.isEdit == false && value.yAxis == i;
      });
      if (index != -1) {
        x = excelCell.find(function(value, index, arr) {
          return value.isEdit == false && value.yAxis == i;
        }).xAxis;
      }
      if (tableHead[j].level - 1 == i) {
        const startArea = excelExportForArea(x) + (1 + i);
        const endArea = excelExportForArea(x + tableHead[j].colspan - 1) + (tableHead[j].rowspan + i);
        for (let k = x; k < x + tableHead[j].colspan; k++) {
          for (let m = i; m < tableHead[j].rowspan + i; m++) {
            excelCell.find(function(value, index, arr) {
              return value.xAxis == k && value.yAxis == m;
            }).isEdit = true;
          }
        }
        while (row.length < x) {
          row.push('');
        }
        row[x] = tableHead[j].title;
        tableHead[j].merge = startArea + ':' + endArea;
      }
    }
    rows.push(row);
  }
  worksheet.insertRows(1, rows);
  for (let j = 0; j < tableHead.length; j++) {
    worksheet.mergeCells(tableHead[j].merge);
    worksheet.getCell(tableHead[j].merge.split(':')[0]).alignment = {
      vertical: 'middle',
      horizontal: tableHead[j].horizontal
    };
  }
  for (let i = 0; i < colArray.length; i++) {
    for (let j = maxLevel + 1; j < 1000; j++) {
      worksheet.getCell(colArray[i].letter + j).alignment = {
        horizontal: colArray[i].horizontal
      };
      if (colArray[i].dataType == 'date') {
        const cell = worksheet.getCell(colArray[i].letter + j);
        cell.value = cell.value != null ? cell.value.substr(0, colArray[i].length) : null;
      }
    }
  }
  workbook.xlsx.writeBuffer().then(function(buffer) {
    saveAs(new Blob([buffer], {
      type: 'application/octet-stream'
    }), fileName);
  });
}

// 导入excel，并解析出数据
/**
 * 
 * @param {*} file 所选择文件的raw值
 * @sheetName excel的sheet名称
 */
export const importExcelToData = (file, sheetName) => {
  // 构建fileReader对象
  const fileReader = new FileReader()
  return new Promise((resolve, reject) => {
    // 该事件为读取完成时触发
    fileReader.onload = function (ev) {
      try {
        const data = ev.target.result;
        const workbook = XLSX.read(data, {type: 'buffer'});
        const listNew = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
        resolve(listNew);
      } catch (e) {
        reject('文件类型不正确');
      }
    }
    // 读取数据
    fileReader.readAsArrayBuffer(file)
  })
}
