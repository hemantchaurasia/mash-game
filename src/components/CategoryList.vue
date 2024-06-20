<template>
  <div class="categories-grid">
    <div v-for="(category, cIndex) in categories" :key="cIndex" class="category-item">
      <h2>{{ category.name }}</h2>
      <ul>
        <li v-for="(option, oIndex) in category.options" :key="oIndex">
          <span 
            :class="{ 'struck-out': visibleOptions[cIndex][oIndex], 'optIn': option.optIn }"
            class="animated-text"
          >
            {{ option.text }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue';

interface Option {
  text: string;
  optOut: boolean;
  optIn: boolean;
}

export default defineComponent({
  name: 'CategoryList',
  props: {
    categories: {
      type: Array as PropType<{ name: string; options: Option[] }[]>,
      required: true
    }
  },
  setup(props) {
    const visibleOptions = reactive(
      props.categories.map(category => category.options.map(() => false))
    );

    const renderWithDelay = async () => {
      for (let cIndex = 0; cIndex < props.categories.length; cIndex++) {
        for (let oIndex = 0; oIndex < props.categories[cIndex].options.length; oIndex++) {
          await new Promise(resolve => setTimeout(resolve, 500)); 
          visibleOptions[cIndex][oIndex] = props.categories[cIndex].options[oIndex].optOut;
        }
      }
    };

    onMounted(() => {
      renderWithDelay();
    });

    return {
      visibleOptions
    };
  }
});
</script>

<style scoped>
.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.category-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
}

.category-item h2 {
  font-size: 1.5em;
  color: #443fe5;
  margin-bottom: 20px;
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
  font-size: 1.2em;
}

.struck-out {
  text-decoration: line-through;
  color: #c15151;
  transition: color 0.3s ease-out;
}

.optIn {
  margin-left: 10px;
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 18px;
  animation: optInAnimation 0.5s infinite alternate;
}

.animated-text {
  transition: color 0.3s ease-out, transform 0.3s ease-out;
}

@keyframes optInAnimation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(5px);
  }
}
</style>
