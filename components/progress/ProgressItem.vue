<script setup lang="ts">
import { computed, ref } from 'vue';
import ProgressGame from './ProgressGame.vue';
import { type TypeProgressData } from '@/types/progress.types';

//
const props = defineProps<{
  step: TypeProgressData;
  curStep: TypeProgressData | null;
  allResult: number;
}>();

//
const activeStar = computed(() => {
  return {
    progress__stars_default: !props.step.games[0].isPlayed,
    progress__stars_active: props.step.id === props.curStep?.id,
    progress__stars_success: props.step.games[0].isPlayed,
  };
});
</script>

<template>
  <li class="progress__item">
    <!-- Добавление 0 первому шагу -->
    <span v-if="step.id === 1" class="progress__result_0">0</span>

    <div class="progress__item_data">
      <!-- Звезда -->
      <div :class="['stars', activeStar]"></div>

      <div class="progress__result">
        <!-- Очки -->
        <span v-if="step.id === curStep?.id">{{ allResult }} / </span>
        <span>{{ step.thresholdPoints }}</span>
      </div>
    </div>

    <!-- Линия прогресса  -->
    <div class="progress__item_line">
      <!-- <div class="progress__item_line__fill" :style="{ width: '0%' }"></div> -->
      <ProgressGame
        v-for="game in step.games"
        :key="game.name"
        :game="game"
        :calculation="step.calculation"
        :count-games="step.games.length"
      />
    </div>
  </li>
</template>

<style lang="css" scoped>
.progress__item {
  position: relative;
  height: 40px;
  list-style: none;
  font-size: 14px;
  border-right: 1px solid #ccc;

  flex-grow: 1;
}

/*  */
.progress__item_data {
  position: absolute;
  top: -30px;
  right: -50px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 52px;
}

.progress__item:last-child:last-child .progress__item_data {
  right: -30px;
}

.stars {
  width: 48px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
}

.progress__stars_default {
  background-image: url(/img/star-1.svg);
}

.progress__stars_active {
  background-image: url(/img/star-2.svg);
}

.progress__stars_success {
  background-image: url(/img/star-3.svg);
}

.progress__item:last-child .stars {
  background-image: url(/img/cubok.svg);
}

/*  */
.progress__result_0 {
  position: absolute;
  bottom: -20px;
  left: 0;
}

/*  */
.progress__item_line {
  width: 100%;
  height: 40px;
  background-color: rgba(239, 239, 239, 0.6);
  display: flex;
  overflow: hidden;
}

.progress__item:first-child .progress__item_line {
  border-radius: 30px 0 0 30px;
}

.progress__item:last-child {
  border-right-width: 0;
}

.progress__item:last-child .progress__item_line {
  border-radius: 0 30px 30px 0;
}

.progress__item_line__fill {
  width: 0;
  height: 100%;
  background-color: rgba(51, 0, 255, 1);
  transition: width 0.1s linear;
}
</style>
