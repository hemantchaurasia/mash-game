<template>
  <div class="result">
    <h2>Your Fortune</h2>
    <ul>
      <li v-for="category in categories" :key="category.name">
        <strong>{{ category.name }}:</strong> {{ getResult(category.name) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

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
  methods: {
    getResult(categoryName: string): string {
      const category = this.categories.find(cat => cat.name === categoryName);
      if (category) {
        const result = category.options.find(opt => opt.optIn);
        return result ? result.text : '';
      }
      return '';
    }
  }
});
</script>

<style scoped>
.result {
  margin-top: 30px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: #2be262;
}

.result h2 {
  font-size: 2.5em;
  color: #3ab94f;
  margin-bottom: 20px;
}

.result ul {
  list-style-type: none;
  padding: 0;
}

.result li {
  font-size: 1.8em;
  margin-bottom: 15px;
}
</style>
