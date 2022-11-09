import { createVNode } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { generateMixed } from './common'

// const node = () => {
//     let nodes = [];
//     nodes.push(createTextVNode('注意: ').);
//     nodes.push(createTextVNode(' - 1.所有数据查询均需使用ID!'));
//     nodes.push(createTextVNode(' - 2.ID一旦丢失无法找回!'));
//     return nodes;
// }

const setMessageNode = () => {
    return createVNode('ul',
        undefined,
        [
            createVNode('li', undefined, '若已有个人ID，请输入并点击【确定】。'),
            createVNode('li', undefined, '若暂无个人ID，请点击【生成】自动生成你的个人ID。'),
            createVNode('li', undefined, '注意：ID一旦丢失无法找回，请妥善保管你的个人ID！')
        ]);
}

const clearMessageNode = () => {
    return createVNode('ul',
        undefined,
        [
            createVNode('li', undefined, '确定清除当前ID? '),
            createVNode('li', undefined, '清除前请记住你的个人ID：' + localStorage.getItem('dddCashBookUserId') + '，以便下次使用！'),
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
        cancelButtonText: '生成',
        inputPattern: /^[a-zA-Z0-9]{6,16}$/,
        inputErrorMessage: '请输入6-16位字符串: 只可以使用字母和数字。'
    }).then(({ value }) => {
        value = value.trim();
        localStorage.setItem('dddCashBookUserId', value);
        ElMessageBox.alert('设置成功, 感谢使用！', '确认', {
            confirmButtonText: '不用谢~',
            cancelButtonText: '不客气~',
            callback: () => {
                location.reload();
            }
        });
    }).catch(() => {
        const generateId = generateMixed(11);
        localStorage.setItem('dddCashBookUserId', generateId);
        ElMessageBox.alert('已生成你的个人ID：' + generateId + '，请妥善保管！', '重要通知', {
            confirmButtonText: '知道了！',
            callback: () => {
                location.reload();
            }
        })
    });

}

/**
 * 清除个人ID
 */
export async function clearUser() {
    ElMessageBox.alert(clearMessageNode, '清除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(() => {
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