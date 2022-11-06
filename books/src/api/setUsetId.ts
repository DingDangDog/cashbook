import { createVNode } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'

// const node = () => {
//     let nodes = [];
//     nodes.push(createTextVNode('注意: ').);
//     nodes.push(createTextVNode(' - 1.所有数据查询均需使用ID!'));
//     nodes.push(createTextVNode(' - 2.ID一旦丢失无法找回!'));
//     return nodes;
// }

const setMessageNode = () => {
    return createVNode('p',
        undefined,
        [
            createVNode('p', undefined, '注意: '),
            createVNode('p', undefined, ' - 所有数据查询均需使用ID'),
            createVNode('p', undefined, ' - ID一旦丢失无法找回')
        ]);
}

const clearMessageNode = () => {
    return createVNode('p',
        undefined,
        [
            createVNode('p', undefined, '确定清除当前ID? '),
            createVNode('p', undefined, '清除前请记住你的ID: ' + localStorage.getItem('dddCashBookUserId') + ' , 以便下次使用!'),
        ]);
}

/**
 * 设置用户ID
 */
export async function openSet() {
    ElMessageBox.prompt(setMessageNode, '请设置你的ID', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9]{6,16}$/,
        inputErrorMessage: '请输入6-16位字符串: 只可以使用字母和数字。'
    }).then(({ value }) => {
        value = value.trim();
        localStorage.setItem('dddCashBookUserId', value);
        ElMessageBox.alert('设置成功, 请谨慎并妥善保管你的ID! ', '确认', {
            confirmButtonText: '知道了！',
            callback: () => {
                location.reload();
            }
        });
    }).catch(() => {
        ElMessageBox.alert('取消设置，所有功能将不可用！', '确认', {
            confirmButtonText: '确定'
        })
    });
}

/**
 * 设置用户ID
 */
export async function clearUser() {
    ElMessageBox.alert(clearMessageNode, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(({ value }) => {
        localStorage.removeItem('dddCashBookUserId');
        ElMessage({
            type: 'success',
            message: '清除成功',
        })
        location.reload();
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消清除',
        })
    });

}


export default openSet;