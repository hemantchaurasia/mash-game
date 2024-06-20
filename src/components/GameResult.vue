<template>
  <div class="game-result">
    <div v-if="showResult">
      <h1>Your Fortune</h1>
      <div v-for="(category, cIndex) in categories" :key="cIndex" class="category-result">
        <p v-if="finalOptions[cIndex]"><span class="resultCat">{{ category.name }}: </span><span class="resultVal">{{ finalOptions[cIndex].text }}</span></p>
      </div>
    </div>
    <div v-else>
      <p>Waiting for results...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';

interface Option {
  text: string;
  optOut: boolean;
  optIn: boolean;
}

export default defineComponent({
  name: 'GameResult',
  props: {
    categories: {
      type: Array as PropType<{ name: string; options: Option[] }[]>,
      required: true
    }
  },
  setup(props) {
    const finalOptions = ref<(Option | null)[]>(new Array(props.categories.length).fill(null));
    const showResult = ref(false);

    const animateoptOutOptions = (category: { options: Option[] }, cIndex: number, resolve: () => void) => {
      let optOutCount = 0;

      category.options.forEach((option, oIndex) => {
        setTimeout(() => {
          if (option.optOut) {
            optOutCount++;
          }
          if (optOutCount === category.options.length - 1) {
            finalOptions.value[cIndex] = category.options.find(option => !option.optOut) || null;
            resolve();
          }
        }, (oIndex + 1) * 3500);
      });
    };

    watchEffect(() => {
      const promises = props.categories.map((category, cIndex) => {
        return new Promise<void>(resolve => {
          animateoptOutOptions(category, cIndex, resolve);
        });
      });

      Promise.all(promises).then(() => {
        showResult.value = true;
      });
    });

    return {
      showResult,
      finalOptions
    };
  }
});
</script>

<style scoped>
.game-result {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
  font-family: 'cursive', cursive;
  margin-top: 30px;
  text-align: center;
  color: #166b31;
}

.category-result {
  color: #1d9f44;
  margin-bottom: 20px;
}

.resultCat {
  color: #e22bd3;
  font-weight: bold;
  margin-top: 30px;
}

.resultVal {
  color: #1d9f44;
  margin-top: 20px;
}

h2 {
  font-size: 1.8em;
  color: #443fe5;
  font-family: 'cursive', cursive;
  font-weight: bold;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.5em;
  color: #bb1394;
  font-family: 'cursive', cursive;
  font-weight: bold;
  margin-bottom: 5px;
}

p {
  font-size: 1.2em;
  color: #333;
}
</style>
