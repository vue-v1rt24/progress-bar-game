import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { type TypeProgressData } from '../types/progress.types';

export const useProgressStore = defineStore('progress', () => {
  // Данные прогресса
  const progressDataServer = ref<TypeProgressData[]>([
    {
      id: 1,
      name: 'Этап первый',
      thresholdPoints: 25,
      calculation: 25,
      games: [
        {
          name: 'Игра 1.1',
          bestResult: 0,
          isPlayed: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Этап второй',
      thresholdPoints: 50,
      calculation: 25,
      games: [
        {
          name: 'Игра 2.1',
          bestResult: 0,
          isPlayed: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Этап третий',
      thresholdPoints: 100,
      calculation: 50,
      games: [
        {
          name: 'Игра 3.1',
          bestResult: 0,
          isPlayed: false,
        },
      ],
    },
    {
      id: 4,
      name: 'Этап четвертый',
      thresholdPoints: 200,
      calculation: 100,
      games: [
        {
          name: 'Игра 4.1',
          bestResult: 0,
          isPlayed: false,
        },
      ],
    },
    {
      id: 5,
      name: 'Этап пятый',
      thresholdPoints: 500,
      calculation: 300,
      games: [
        {
          name: 'Игра 5.1',
          bestResult: 0,
          isPlayed: false,
        },
      ],
    },
    {
      id: 6,
      name: 'Этап шестой',
      thresholdPoints: 1000,
      calculation: 250,
      games: [
        {
          name: 'Игра 6.1',
          bestResult: 0,
          isPlayed: false,
        },
        {
          name: 'Игра 6.2',
          bestResult: 0,
          isPlayed: false,
        },
      ],
    },
  ]);

  ////////////
  const result = () => {
    let asd = 0;

    return progressDataServer.value.reduce((acc: TypeProgressData[], item) => {
      item.calculation = (item.thresholdPoints - asd) / item.games.length;
      asd = item.thresholdPoints;
      acc.push(item);
      return acc;
    }, []);
  };

  console.log(result());
  const progressData = ref<TypeProgressData[]>(result());
  ////////////

  // Общий счёт
  const getAllResult = computed(() => {
    return progressData.value.reduce((acc, item) => {
      const count = item.games.reduce((gAcc, gItem) => gAcc + gItem.bestResult, 0);
      acc += count;
      return acc;
    }, 0);
  });

  // Получение текущего шага
  const getCurrentStep = (id: number, stepName: string) => {
    const step = progressData.value.find((s) => s.id === id);

    if (step) {
      step['stepName'] = stepName;
    }

    return {
      step,
    };
  };

  //
  return {
    progressData,
    getAllResult,
    getCurrentStep,
  };
});
