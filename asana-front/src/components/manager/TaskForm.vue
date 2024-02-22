<template>
  <form @submit.prevent="onSubmit" class="bg-white dark:bg-dark-grey rounded-lg p-1">
    <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-scroll">
      <div class="flex justify-between items-center">
        <h4 class="text-black dark:text-white font-bold text-lg">
          {{ managerStore.taskForm.edit ? 'Редактировать задачу' : 'Добавить новую задачу' }}
        </h4>
      </div>
      <BaseInput ref="inputTitle" v-model="form.task.title" inputName="Title" placeholder="e.g. Сделайте перерыв на кофе" />
      <BaseTextarea v-model="form.task.description" inputName="Description"
        placeholder="e.g. Всегда хорошо сделать перерыв. Этот 15-минутный перерыв немного подзарядит батарейки." />
      <div class="flex flex-col gap-3">
        <p class="text-medium-grey text-xs font-bold">Подзадачи</p>
        <div ref="errorSubtasks" class="flex items-center justify-between gap-4"
          v-for="(subtask, index) in form.task.subtasks" :key="index">
          <BaseInput :ref="el => { inputs[index] = el }" v-model="subtask.title"
            :placeholder="subtaskPlaceholders[index] ? subtaskPlaceholders[index] : 'Название подзадачи'" />
          <IconCross @click="deleteSubtask(index)" class="cursor-pointer" />
        </div>
        <ButtonSecondaryLarge type="button" @click.stop="addSubtask">+ Добавить под задачи</ButtonSecondaryLarge>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-medium-grey text-xs font-bold">Статус</p>
        <BaseSelect @onClickOption="updateColumn" :value="columnName" />
      </div>
      <ButtonPrimaryLarge type="submit">
        {{ managerStore.taskForm.edit ? 'Сохранить изминения' : 'Создать задачу' }}
      </ButtonPrimaryLarge>
    </div>
  </form>
</template>
<script setup>
import { ref, reactive, onBeforeUpdate } from 'vue'
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager.js';
import BaseSelect from '@/components/form/BaseSelect.vue';
import BaseInput from '@/components/form/BaseInput.vue';
import BaseTextarea from '../form/BaseTextarea.vue';
import IconCross from '../icons/IconCross.vue';
import ButtonPrimaryLarge from '../buttons/PrimaryLarge.vue';
import ButtonSecondaryLarge from '../buttons/SecondaryLarge.vue';
import { v4 as uuid } from 'uuid';
const boardsStore = useBoardsStore();
const managerStore = useManagerStore();
const columnName = ref('')

const inputTitle = ref(null)
const inputs = ref([])

const form = reactive({
  task: {
    title: '',
    description: '',
    subtasks: [{ title: '', isCompleted: false }, { title: '', isCompleted: false }]
  },
  column: 0
})
const subtaskPlaceholders = {
  0: 'e.g. Сделать кофу',
  1: 'e.g. Пить кофе, улыбнись епта'
}
const deleteSubtask = (index) => {
  if (form.task.subtasks.length === 2) {
    form.task.subtasks[index].title = ''
    form.task.subtasks[index].isCompleted = false
  } else {
    form.task.subtasks.splice(index, 1)
  }
}
const addSubtask = () => {
  form.task.subtasks.push({ title: '', isCompleted: false })
}

const onSubmit = () => {
  if (validate()) {
    if (managerStore.taskForm.edit) {

      console.log(form.task.subtasks)
      const updateTaskData = {
        title: form.task.title,
        description: form.task.description,
        status: columnName.value,
        subtasks: form.task.subtasks.map(subtask => ({
          subtaskId: subtask.id,
          title: subtask.title,
          isCompleted: subtask.isCompleted ? 1 : 0
        }
        ))
      };
      boardsStore.updateTask({ taskId: form.task.id, taskData: updateTaskData, column: form.column })
      setTimeout(() =>  boardsStore.getBoardsMount(),[2000])
    } else {
      boardsStore.getColumns[form.column].tasks.push({...form.task, id: uuid()})
    }
    managerStore.hideOverlay()
    managerStore.taskForm.edit = false;
  }
}
const validate = () => {
  let valid = true
  if (form.task.title.trim().length === 0) {
    valid = false
    inputTitle.value.error = true
  }
  inputs.value.forEach((e, index) => {
    if (form.task.subtasks[index]?.title.trim().length === 0) {
      valid = false
      e.error = true
    }
  })
  return valid
}
const updateColumn = ({ index, name }) => {
  form.column = index
  columnName.value = name
}

//EDIT MODE
if (managerStore.taskForm.edit) {
  form.task = JSON.parse(JSON.stringify(boardsStore.getTask))
  form.column = JSON.parse(JSON.stringify(boardsStore.selectedColumn))
  columnName.value = JSON.parse(JSON.stringify(boardsStore.getColumnsNames[boardsStore.selectedColumn]))
} else {
  columnName.value = JSON.parse(JSON.stringify(boardsStore.getColumnsNames[0]))
}

onBeforeUpdate(() => {
  inputs.value = []
})
</script>
