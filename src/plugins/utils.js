import  xlsx  from "xlsx";

/**
 * 导出数据
 * data 数据格式 {title:sheet名称, table: 表格数据,}
 */
export class Export {

    constructor(fileName) {
        this.fileName = fileName;
    }

    exportData(data) {
        let array = [];
        let merges = [];
        let len = data.table[0].length;

        // 判断是否有头部说明
        if ("title" in data) {
            array.unshift([ data.title ]);
            merges.push({
                s: { // s 开始位置
                    c: 0, // 开始列
                    r: 0  // 开始取值范围
                },
                e: { // e 结束位置
                    c: len - 1, // 结束列
                    r: 0   // 结束范围
                }
            })
        }

        array = [ ...array, ...data.table ];
        //json转数组
        let ws = xlsx.utils.aoa_to_sheet(array);
        //设置列宽
        ws['!cols']= [
            {width: 15},
            {width: 15},
            {width: 50},
        ];
        // 合并单元格
        ws['!merges'] = merges;
        //创建新的book
        let new_ws = xlsx.utils.book_new();
        //sheet写入book
        xlsx.utils.book_append_sheet(new_ws, ws, data.title);
        //输出
        xlsx.writeFile(new_ws, `${ this.fileName }.xlsx`)
    }
}


/**
 *  导入数据
 */
export class ImportData {

    constructor() {
        this.origin = []; // 导入单个
        this.origins = []; // 导入多个
    }

    readFileData(files, callback) {
        let fileReader = new FileReader(); // 创建读取文件的实例
        fileReader.readAsBinaryString(files); // 读取文件内容
        fileReader.onload = (ev) => { // 读取完毕拿到编码数据
            this.doXlsx(ev.target['result'], callback);
        };
    }

    doXlsx(data, callback) {
        let workBook = xlsx.read(data, {type: 'binary'}); // 将数据读取成数组

        // 判断sheet页签有多少个
        if (workBook.SheetNames.length === 1) { //单个页签sheet
            this.origin = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]]);
        } else { // 多个页签sheet
            workBook.SheetNames.forEach((item, i) => {
                this.origins['data' + i] = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[i]])
            })
        }

        if (callback) {
            callback(this.origin) // 返回单个sheet的数据
            // callback(this.origins) // 返回多个sheet的数据
        }
    }
}
