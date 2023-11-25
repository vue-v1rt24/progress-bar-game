<script setup lang="ts">
import { computed, ref } from 'vue';
import { useProgressStore } from '@/stores/progress.stores';
import ProgressItem from './ProgressItem.vue';

import { type TypeProgressData } from '@/types/progress.types';

//
const store = useProgressStore();

//
const selectStep = ref<TypeProgressData | null>(null);
const activeGameIndex = ref(0);
const stopClickButton = ref(false);

const gameName = store.progressData.reduce((acc: string[], item) => {
  const name = item.games.reduce((gAcc: string[], gItem) => gAcc.concat(gItem.name), []);
  acc.push(...name);
  return acc;
}, []);

//
const getAllResult = computed(() => {
  return +store.getAllResult.toFixed(1);
});

//
const selectLevel = (id: number, stepName: string) => {
  if (stopClickButton.value) return;

  const curStep = store.getCurrentStep(id, stepName);
  console.log(curStep);

  if (curStep.step) {
    stopClickButton.value = true;
    selectStep.value = curStep.step;
    const game = curStep.step.games.find((g) => g.name === stepName);

    if (game) {
      const setInt = setInterval(() => {
        game.bestResult++;

        if (game!.bestResult > curStep.step!.calculation) {
          game.bestResult = curStep.step!.calculation;
        }

        if (game!.bestResult >= curStep.step!.calculation) {
          clearInterval(setInt);
          game!.isPlayed = true;
          activeGameIndex.value++;
          stopClickButton.value = false;
        }
      }, 1);
    }
  }
};
</script>

<template>
  <ul class="progress">
    <ProgressItem
      v-for="step in store.progressData"
      :key="step.id"
      :step="step"
      :cur-step="selectStep"
      :all-result="getAllResult"
    />
  </ul>

  <ul class="levels">
    <li v-for="level in store.progressData" :key="level.id" class="levels__item">
      {{ level.name }}

      <ul class="levels__inner">
        <li v-for="game in level.games" :key="game.name" class="levels__inner_item">
          <button
            type="button"
            @click="selectLevel(level.id, game.name)"
            :disabled="(!game.isPlayed && gameName[activeGameIndex] !== game.name) || game.isPlayed"
          >
            {{ game.name }}
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="css" scoped>
.progress {
  width: 900px;
  display: flex;
  align-items: center;
}

/*  */
.levels {
  margin-top: 100px;
}

.levels li {
  list-style: none;
}

.levels__item {
  margin-bottom: 10px;
}

/*  */
.levels__inner_item button {
  color: rgb(15, 125, 180);
  cursor: pointer;
}

.levels__inner_item button:disabled {
  cursor: no-drop;
}
</style>
