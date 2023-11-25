<script setup lang="ts">
import { computed } from 'vue';
import { type TypeGame } from '@/types/progress.types';

//
const props = defineProps<{
  game: TypeGame;
  calculation: number;
  countGames: number;
}>();

//
const progress = computed(() => {
  return (props.game.bestResult / props.calculation) * (100 / props.countGames);
});
</script>

<template>
  <div class="progress__item_line__fill" :style="{ width: progress + '%' }"></div>
</template>

<style lang="css" scoped></style>
