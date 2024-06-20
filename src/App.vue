<template>
  <div id="app">
    <div class="header">
      <h1>MASH Game</h1>
    </div>
    <div class="game-container">
      <form v-if="editable" @submit.prevent="runGame" class="input-form">
        <div class="input-grid">
          <div
            v-for="(category, cIndex) in categories"
            :key="cIndex"
            :class="['category-input', cIndex === 0 ? 'full-row' : '']"
          >
            <div class="category-header">
              <input
                v-if="cIndex !== 0"
                v-model="categories[cIndex].name"
                :placeholder="'Category ' + (cIndex + 1)"
                class="input-field category-name-input"
              />
              <h2 v-else>{{ category.name }}</h2>
              <button
                v-if="cIndex !== 0"
                type="button"
                @click="deleteCategory(cIndex)"
                class="delete-category-button"
              >Delete</button>
            </div>
            <div v-for="(option, oIndex) in category.options" :key="oIndex" class="option-input">
              <input
                v-model="categories[cIndex].options[oIndex].text"
                :id="'optionInput_' + cIndex + '_' + oIndex"
                :readonly="!editable"
                required
                class="input-field"
                placeholder="Enter option"
              />
            </div>
          </div>
        </div>
        <div class="right">
          <button type="button" @click="addCategory" class="add-category-button">Add New Category</button>
        </div>
        <div class="form-footer">
          <div class="input-number-wrapper">
            <p>Select a number from 3 to 10:</p>
            <input type="number" v-model.number="countNumber" min="3" max="10" required class="input-number" />
            <button type="submit" class="run-button">Play MASH</button>
          </div>
        </div>
      </form>
      <div v-else>
        <div class="result-grid">
          <CategoryList :categories="categories" class="result-category-list" />
          <GameResult :categories="categories" class="result-game-result" />
        </div>
        <div class="centered">
          <button @click="resetGame" class="replay-button">Play Again</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CategoryList from './components/CategoryList.vue';
import GameResult from './components/GameResult.vue';

interface Option {
  text: string;
  optOut: boolean;
  optIn: boolean;
}

export default defineComponent({
  name: 'App',
  components: {
    CategoryList,
    GameResult
  },
  setup() {
    const categories = ref<{ name: string; options: Option[] }[]>([
      { name: 'You will live in', options: [
        { text: 'Mansion', optOut: false, optIn: false },
        { text: 'Apartment', optOut: false, optIn: false },
        { text: 'Shack', optOut: false, optIn: false },
        { text: 'House', optOut: false, optIn: false },
      ] },
      { name: 'Life partner', options: [
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
      ] },
      { name: 'Number of kids', options: [
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false }
      ] },
      { name: 'Job', options: [
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false }
      ] },
      { name: 'Salary', options: [
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false }
      ] },
      { name: 'Car', options: [
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false }
      ] },
      { name: 'Place', options: [
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false },
        { text: '', optOut: false, optIn: false }
      ] }
    ]);

    const countNumber = ref<number>(3);
    const showResult = ref<boolean>(false);
    const editable = ref<boolean>(true);

    const runGame = () => {
      editable.value = false;
      let index = 0;

      categories.value.forEach(category => {
        category.options.forEach(option => {
          option.optOut = false;
          option.optIn = false;
        });

        let remainingOptions = category.options.slice();

        while (remainingOptions.length > 1) {
          index = (index + countNumber.value - 1) % remainingOptions.length;
          remainingOptions[index].optOut = true;
          remainingOptions = remainingOptions.filter(option => !option.optOut);
        }

        if (remainingOptions.length === 1) {
          remainingOptions[0].optIn = true;
        }
      });

      showResult.value = true;
    };

  /* <TODO>
  const runGame = async () => {
      editable.value = false;
      console.log("Game started, resetting options...");

      // Reset all options
      categories.value.forEach(category => {
        category.options.forEach(option => {
          option.optOut = false;
          option.circled = false;
        });
      });

      // Flatten all options into a single array with references to their categories
      const allOptions = categories.value.flatMap((category, cIndex) =>
        category.options.map((option, oIndex) => ({ ...option, cIndex, oIndex }))
      );

      // Track the number of remaining options
      let optionsRemaining = allOptions.length;
      console.log("Total options:", optionsRemaining);

      // Initialize the index for the elimination process
      let currentIndex = 0;

      // Strike out options until each category has only one option left
      while (optionsRemaining > categories.value.length) {
        let count = 0;
        while (count < countNumber.value) {
          if (!allOptions[currentIndex].optOut) {
            count++;
          }
          if (count < countNumber.value) {
            currentIndex = (currentIndex + 1) % allOptions.length;
          }
        }

        // Strike out the current option
        allOptions[currentIndex].optOut = true;
        console.log(`Striking out option: ${allOptions[currentIndex].text} at index ${currentIndex}`);
        optionsRemaining--;

        // Wait for a short delay to visualize the process
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Move to the next option for the next round
        currentIndex = (currentIndex + 1) % allOptions.length;
      }

      // Circle the final remaining option in each category
      categories.value.forEach(category => {
        const remainingOptions = category.options.filter(option => !option.optOut);
        if (remainingOptions.length === 1) {
          remainingOptions[0].optIn = true;
          console.log(`Circling option: ${remainingOptions[0].text} in category: ${category.name}`);
        }
      });

      showResult.value = true;
      console.log("Game finished, results are ready.");
    }; */

    const resetGame = () => {
      categories.value.forEach(category => {
        category.options.forEach(option => {
          option.optOut = false;
          option.optIn = false;
        });
      });

      countNumber.value = 3;
      showResult.value = false;
      editable.value = true;
    };

    const addCategory = () => {
      categories.value.push({
        name: 'New Category',
        options: [
          { text: '', optOut: false, optIn: false },
          { text: '', optOut: false, optIn: false },
          { text: '', optOut: false, optIn: false },
          { text: '', optOut: false, optIn: false }
        ]
      });
    };

    const deleteCategory = (index: number) => {
      categories.value.splice(index, 1);
    };

    return {
      categories,
      countNumber,
      showResult,
      editable,
      runGame,
      resetGame,
      addCategory,
      deleteCategory
    };
  }
});
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 20px;
  background-color: #ec8bd0;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-form {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ffffff;
  font-family: 'cursive', cursive;
  color: #443fe5;
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
  background-color: #d2ec8b;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.full-row {
  grid-column: span 3;
}

.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
}

.category-input {
  margin-bottom: 20px;
}

.option-input {
  margin-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 18px;
  color: #bb1394;
  border: 1px solid #022211;
  border-radius: 4px;
}

.input-number-wrapper {
  display: flex;
  align-items: center;
}

.input-number {
  width: 80px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.run-button {
  padding: 10px;
  background-color: #8a2be2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 18px;
}

.run-button:hover {
  background-color: #4b0082;
}

.delete-category-button {
  background-color: #fa8072;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 14px;
  border-radius: 4px;
}

.delete-category-button:hover {
  background-color: #cd5c5c;
}

.add-category-button {
  background-color: #6b8e23;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 18px;
  border-radius: 4px;
}

.add-category-button:hover {
  background-color: #556b2f;
}

.centered {
  text-align: center;
  margin-top: 20px;
}

.replay-button {
  background-color: #4682b4;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 18px;
  border-radius: 4px;
}

.replay-button:hover {
  background-color: #4169e1;
}

.result-category-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
}

.result-game-result {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-name-input {
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 18px;
  color: #443fe5;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-number-wrapper p {
  font-family: 'cursive', cursive;
  font-weight: bold;
  font-size: 18px;
  color: #443fe5;
  margin-right: 10px;
}

</style>
