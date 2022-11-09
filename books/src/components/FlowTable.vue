<template>
  <el-row class="queryRow">
    <div class="queryParam">
      <el-button type="primary" @click="openCreateDialog(formTitle[0])">新增</el-button>
    </div>

    <div class="queryParam">
      <el-date-picker v-model="queryRef.startDay" type="date" placeholder="开始时间" />
    </div>
    <div class="queryParam">
      <el-date-picker v-model="queryRef.endDay" type="date" placeholder="结束时间" />
    </div>
    <div class="queryParam">
      <el-select v-model="queryRef.type" class="m-2" placeholder="消费类型" clearable>
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <div class="queryParam">
      <el-select v-model="queryRef.payType" class="m-2" placeholder="支付方式" clearable>
        <el-option v-for="item in payTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <div class="queryParam">
      <el-input v-model="queryRef.name" placeholder="名称" />
    </div>

    <!-- <div class="queryParam">
      <el-input v-model="queryRef.description" placeholder="描述" />
    </div> -->

    <div class="queryParam">
      <el-button :icon="Search" circle @click="doQuery()" />
    </div>

    <div class="queryParam">
      <el-button type="primary" @click="dialogUpdateVisible = true">导入</el-button>
    </div>
  </el-row>

  <el-table v-loading="loading" :data="flowPageRef.pageData" stripe row-key="row" :height="tableRef.height">
    <el-table-column type="index" width="50" />
    <el-table-column prop="id" label="ID" v-if=false />
    <el-table-column prop="day" label="日期" :formatter="timeFormatter" min-width="40" />
    <el-table-column prop="type" label="消费类型" min-width="30" />
    <el-table-column prop="money" label="金额（元）" min-width="30" />
    <el-table-column prop="payType" label="支付方式" min-width="40" />
    <el-table-column prop="name" label="名称" min-width="40" />
    <el-table-column prop="description" label="描述" />
    <el-table-column label="操作" prop="id" width="110">
      <template v-slot="scop">
        <el-button type="primary" :icon="Edit" circle @click="openUpdateDialog(formTitle[1], scop.row)" />
        <el-button type="danger" :icon="Delete" circle @click="deleteById(scop.row.id)" />
      </template>
    </el-table-column>
  </el-table>

  <div class="pageDiv">
    <!-- {{ queryRef }},{{ flowPageRef }} -->
    <el-pagination :current-page="queryRef.pageNum" :page-size="queryRef.pageSize" :total="flowPageRef.totalCount"
      :page-sizes="[10, 20, 50, 100]" @size-change="pageSizeChange" @current-change="pageNumChange" background
      layout="->, sizes, prev, pager, next">
    </el-pagination>
  </div>


  <!-- 弹出框表单 -->
  <el-dialog v-model="dialogFormVisible" :title="dialgoFormTitle">

    <el-form ref="dialgoFormRef" :model="flowRef" :rules="rules">

      <el-form-item label="日期" :label-width="formLabelWidth" prop="day">
        <el-date-picker v-model="flowRef.day" type="date" format="YYYY/MM/DD"
          :default-value="new Date(flowRef.day || new Date())" @change="changeDate()" placeholder="选择">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="消费类型" :label-width="formLabelWidth" prop="type">
        <el-select v-model="flowRef.type" placeholder="选择" clearable>
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="金额" :label-width="formLabelWidth" prop="money">
        <el-input-number v-model="flowRef.money" :min="0" />
      </el-form-item>

      <el-form-item label="支付方式" :label-width="formLabelWidth" prop="payType">
        <el-select v-model="flowRef.payType" placeholder="选择" clearable>
          <el-option v-for="item in payTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="flowRef.name" />
      </el-form-item>

      <el-form-item label="描述" :label-width="formLabelWidth" prop="description" textarea>
        <el-input v-model="flowRef.description" />
      </el-form-item>
    </el-form>
    <!-- 表单确认按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(dialgoFormRef, false)">
          取消
        </el-button>
        <el-button type="primary" @click="confirmForm(dialgoFormRef, false)">
          确定
        </el-button>
        <el-button type="success" v-if="formTitle[0] === dialgoFormTitle" @click="confirmForm(dialgoFormRef, true)">
          确定并继续
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogUpdateVisible" title="文件上传">
    <el-upload v-model:file-list="fileList" class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :on-preview="handlePreview"
      :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed">
      <el-button type="primary">选择文件</el-button>
      <template #tip>
        <div class="el-upload__tip">
          仅支持上传excel文件
        </div>
      </template>
    </el-upload>
  </el-dialog>

</template>

<script setup lang="ts">
// 第三方库引入
import { ref, onMounted, reactive } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus'
import { Search, Delete, Edit } from '@element-plus/icons-vue';
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'

// 自建库引入
import { getFlowPage, deleteFlow, create, update } from '../api/api';
import type { Page } from '../types/page';
import type { Flow, FlowQuery } from '../types/flow';



// const tableRef = ref();
// tableRef.value.height = document.documentElement.clientHeight * 0.65;

const tableRef = ref({
  'height': document.documentElement.clientHeight * 0.63
});

/*
 * 集中定义常量
 */
const typeOptions = [
  { value: '饮食', label: '饮食' },
  { value: '办公', label: '办公' },
  { value: '娱乐', label: '娱乐' },
  { value: '生活', label: '生活' },
  { value: '医疗', label: '医疗' },
  { value: '社交', label: '社交' },
  { value: '学习', label: '学习' },
  { value: '通讯', label: '通讯' },
  { value: '交通', label: '交通' },
  { value: '住宿', label: '住宿' },
  { value: '其他', label: '其他' }
];

const payTypeOptions = [
  { value: '支付宝', label: '支付宝' },
  { value: '微信', label: '微信' },
  { value: '京东白条', label: '京东白条' },
  { value: '刷卡', label: '刷卡' },
  { value: '现金', label: '现金' }
];


const query: FlowQuery = {
  pageNum: 1,
  pageSize: 10
};

const flowPage: Page<Flow> = {
  pageNum: 1,
  pageSize: 0,
  totalPage: 1,
  totalCount: 0,
  pageData: []
};

// 初始化空对象
const flow: Flow = {
  id: undefined,
  day: new Date(),
  type: undefined,
  payType: undefined,
  money: undefined,
  name: undefined,
  description: undefined
};

// 表单输入框校验规则
const rules = ref<FormRules>({
  day: [{ required: true, type: 'date', message: '请选择日期！', trigger: 'blur', },],
  type: [{ required: true, message: '请选择消费类型！', trigger: 'blur' },],
  money: [{ required: true, message: '请输入金额！', trigger: 'blur' }]
});


// 表单弹窗标题选项
const formTitle = [
  '新增流水',
  '修改流水'
];
/**
 * 组件属性绑定
 */
// 加载蒙版显示控制器
const loading = ref(true);
// 表单弹窗显示控制器
const dialogFormVisible = ref(false);
// 导入弹窗显示控制器
const dialogUpdateVisible = ref(false);
// 表单弹窗标题
const dialgoFormTitle = ref(formTitle[0]);
// 表单输入框宽度
const formLabelWidth = '200px';
// 表单实例
const dialgoFormRef = ref<FormInstance>();
// 查询条件数据绑定
const queryRef = ref(query);
// 分页数据绑定
const flowPageRef = ref(flowPage);
// 表单弹窗数据绑定
const flowRef = reactive(flow);


// 初始化后自动执行
onMounted(() => {
  doQuery();
});

// 切换页码
const pageNumChange = (pageNum: number) => {
  queryRef.value.pageNum = pageNum;
  doQuery();
};

// 切换分页容量
const pageSizeChange = (pageSize: number) => {
  queryRef.value.pageSize = pageSize;
  doQuery();
};

// 执行分页数据查询
const doQuery = () => {
  getFlowPage(queryRef.value).then(res => {
    flowPageRef.value = res;
    // console.log(JSON.stringify(flowPage) + "doQuery");
    loading.value = false;
  });
};

// 提交表单
const confirmForm = async (dialgoForm: FormInstance | undefined, closeDialog: boolean) => {
  if (!dialgoForm) return;
  if (! await dialgoForm.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
      return false;
    }
  })) {
    return;
  }
  if (formTitle[0] === dialgoFormTitle.value) {
    // 新增
    createOne();
  } else {
    // 修改
    updateOne();
  }
  resetForm(dialgoForm, closeDialog);
};

// 重置表单数据
const resetForm = (formEl: FormInstance | undefined, showDialog: boolean) => {
  if (!formEl) return;
  flowRef.id = undefined;
  // flowRef.day = flowRef.day;
  flowRef.type = undefined;
  flowRef.payType = undefined;
  flowRef.money = undefined;
  flowRef.name = undefined;
  flowRef.description = undefined;
  dialogFormVisible.value = showDialog;
};

// 创建
const createOne = () => {
  create({
    day: flowRef.day,
    type: flowRef.type,
    money: flowRef.money,
    payType: flowRef.payType,
    name: flowRef.name,
    description: flowRef.description,
  }).then(res => {
    if (res.id) {
      doQuery();
      ElMessage({
        type: 'success',
        message: '新增成功',
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '新增出现异常',
    })
  });
};

// 更新
const updateOne = () => {
  update(flowRef.id || -1, {
    day: flowRef.day,
    type: flowRef.type,
    money: flowRef.money,
    payType: flowRef.payType,
    name: flowRef.name,
    description: flowRef.description,
  }).then(res => {
    if (res.acknowledged) {
      doQuery();
      ElMessage({
        type: 'success',
        message: '更新成功：共更新' + res.modifiedCount + '条数据',
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '更新出现异常',
    })
  });
};

// 删除
const deleteById = (id: number) => {
  ElMessageBox.confirm(
    '确定删除此流水？',
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    deleteFlow(id).then(res => {
      doQuery();
      if (res.acknowledged) {
        ElMessage({
          type: 'success',
          message: '删除成功：共删除' + res.deletedCount + '条数据',
        })
      }
    }).catch(() => {
      ElMessage({
        type: 'error',
        message: '删除失败',
      })
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
};

const openCreateDialog = (title: string) => {
  dialgoFormTitle.value = title;
  dialogFormVisible.value = true;
}

const openUpdateDialog = (title: string, updateFlow: Flow) => {
  dialgoFormTitle.value = title;
  dialogFormVisible.value = true;

  flowRef.id = updateFlow.id;
  flowRef.day = updateFlow.day;
  flowRef.type = updateFlow.type;
  flowRef.payType = updateFlow.payType;
  flowRef.money = updateFlow.money;
  flowRef.name = updateFlow.name;
  flowRef.description = updateFlow.description;
};

const changeDate = () => {
  flowRef.day = new Date(+(flowRef.day || new Date()) + (8 * 60 * 60 * 1000));
};

/**
 * 日期格式化方法
 * @param row 
 * @param column 
 * @param cellValue 
 * @param index 
 */
const timeFormatter = (row: any, column: Date, cellValue: string, index: number) => {
  let format: string = 'YYYY-mm-dd'
  let date = new Date(cellValue);
  const dataItem = {
    YYYY: date.getFullYear().toString(),
    mm: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
    dd: date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(),
    // 'HH': date.getHours().toString(),
    // 'Mm': date.getMinutes().toString(),
    // 'ss': date.getSeconds().toString(),
  };
  format = format.replace('YYYY', dataItem.YYYY);
  format = format.replace('mm', dataItem.mm);
  format = format.replace('dd', dataItem.dd);
  return format
}


/**
 * 文件上传相关代码
 */
const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
// ref(1)

// 将需要对外暴露的方法和对象添加到这里
// defineExpose({
//   queryRef, flowPageRef, pageChange, doQuery
// });

</script>

<style scoped>
.queryRow .queryParam {
  margin: 8px 3px;
}

.pageDiv {
  margin: 10px 0;
}
</style>
