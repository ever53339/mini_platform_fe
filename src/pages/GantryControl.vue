<template>
  <div class="gantry-panel">
    <table class="gantry-table">
      <tr>
        <th>Axis</th>
        <th>Set Zero</th>
        <th>Position (mm)</th>
        <th colspan='3'>Jogging</th>
      </tr>
      <tr>
        <td>X</td>
        <td><button class="reset-button">set zero X</button></td>
        <td><input type="text"></input></td>
        <td><button class="jog-plus">+</button></td>
        <td><button class="jog-minus">-</button></td>
          <td><select class="jog-select">
          <option value=".1">0.1 mm</option>
          <option value="1">1 mm</option>
          <option value="10">10 mm</option>
          <option value="100">100 mm</option>
        </select></td>
      </tr>
      <tr>
        <td>Y</td>
        <td><button class="reset-button">set zero Y</button></td>
        <td><input type="text"></input></td>
        <td><button class="jog-plus">+</button></td>
        <td><button class="jog-minus">-</button></td>
          <td><select class="jog-select">
          <option value=".1">0.1 mm</option>
          <option value="1">1 mm</option>
          <option value="10">10 mm</option>
          <option value="100">100 mm</option>
        </select></td>
      </tr>
      <tr>
        <td>Z</td>
        <td><button class="reset-button">set zero Z</button></td>
        <td><input type="text"></input></td>
        <td><button class="jog-plus">+</button></td>
        <td><button class="jog-minus">-</button></td>
          <td><select class="jog-select">
          <option value=".1">0.1 mm</option>
          <option value="1">1 mm</option>
          <option value="10">10 mm</option>
          <option value="100">100 mm</option>
        </select></td>
      </tr>

  </table>
</div>
</template>



<script setup lang="ts">
import { ref } from 'vue';

let arrow_size = ref(60);

</script>

<style scoped>
  .gantry-panel {
    width: 800px;
    height: 300px;
    background-color: rgb(53, 132, 53);

    /* border: 1px solid; */
    border-radius: 15px;
    /* vertical-align: middle; */
  }
  
  .gantry-table {
    margin-top: 10px;
    margin-left: 10px;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
  }
  .gantry-table th {
    height: 40px;
  }
  .gantry-table td {
    height: 30px;
    font-size: 20px;
  }
  .gantry-table button {
    font-size: 20px;
    height: 35px;
  }
  .gantry-table input {
    height: 35px;
    box-sizing: border-box;
  }

  .jog-plus {
    width: 50px;
  }
  .jog-minus {
    width: 50px;
  }
  .jog-select {
    height: 35px;
    text-align: center;
    font-size: 20px;
  }
</style>