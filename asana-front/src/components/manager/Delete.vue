<template>
  <div class="bg-white dark:bg-dark-grey rounded-lg">
    <div class="p-6 flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h4 class="text-red font-bold text-lg">Удалить эту {{ managerStore.delete.board ? 'доску' : 'задачу' }}</h4>
      </div>
      <p class="text-medium-grey text-sm">{{ warning }}</p>
      <div class="flex flex-col gap-4">
        <ButtonDelete @click.stop="onDelete">Удалить</ButtonDelete>
        <ButtonSecondaryLarge @click.stop="onCancel">Отменить</ButtonSecondaryLarge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager.js';
import ButtonDelete from '@/components/buttons/Destructive.vue';
import ButtonSecondaryLarge from '@/components/buttons/SecondaryLarge.vue';


const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

const warning = computed(() => {
  if (managerStore.delete.board) {
    return `Вы уверены, что хотите удалить доску ‘${boardsStore.getCurrentBoard.name}’ ? Будут удалить все данные.`
  } else {
    return `Вы уверены, что хотите удалить задача и ее подзадачи? ‘${boardsStore.getTask.title}’ Это действие невозможно отменить.`
  }
})

const onDelete = () => {
  if (managerStore.delete.board) {
    boardsStore.deleteBoard(boardsStore.boards[boardsStore.selectedBoard].id)
    boardsStore.boards.splice(boardsStore.selectedBoard, 1)
    managerStore.hideOverlay()
  } else {
    boardsStore.getCurrentColumn.tasks.splice(boardsStore.selectedTask, 1)
    managerStore.hideOverlay()
  }
}
const onCancel = () => {
  managerStore.hideOverlay()
}
</script>
