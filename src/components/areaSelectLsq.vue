<template>
  <div class="area-template">
    <div class="area-title">请选择</div>
    <div class="area-choose">
      <div v-for="(item, index) in areaData" :key="index">
        <div
          :class="{
            'area-choose-item': true,
            'area-choose-item_active': currentListKey === index,
          }"
          v-if="item.id"
        >
          <div class="circle"></div>
          <div
            class="area-choose-item_label"
            @click="chooseTextClick(index, item)"
          >
            {{ item.label }}
          </div>
          <div
            class="line"
            v-if="index !== levelKey || (index === levelKey && chooseTipText)"
          ></div>
        </div>
      </div>
      <div
        :class="{
          'area-choose-item': true,
          'area-choose-item_active': !currentListVal,
        }"
        v-if="chooseTipText"
      >
        <div class="circle"></div>
        <div class="area-choose-item_label" @click="showArea">
          {{ chooseTipText }}
        </div>
      </div>
    </div>
    <div class="area-list-wrap">
      <div class="area-list-title">{{ listTipText }}</div>
      <div class="area-list">
        <div
          :class="{
            'area-list-item': true,
            'area-list-item_active': currentListVal === item.id,
          }"
          v-for="(item, index) in areaList"
          :key="index"
          @click="chooseItem(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import areaJson from "../utils/area";
export default {
  name:"areaSelectLsq",
  props: {
    level: {
      type: Number,
      default: 3,
    },
    chooseData: {
      type: Object,
      default: () => ({}),
    },
    areaJson: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      areaAllData: [],
      areaData: {
        // province: { label: "", id: "" },
        // city: { label: "", id: "" },
        // area: { label: "", id: "" }
      },
      areaTips: [
        { key: "province", label: "省份" },
        { key: "city", label: "城市" },
        { key: "area", label: "区/县" },
      ],
      currentListKey: "",
      listTipText: "",
      areaList: [],
    };
  },
  watch: {
    areaData: {
      deep: true,
      handler: function(val) {
        this.$emit("changeArea", val);
      },
    },
  },
  computed: {
    chooseTipText() {
      let emptyKey = "";
      for (let key in this.areaData) {
        if (!this.areaData[key].id) {
          emptyKey = key;
          break;
        }
      }
      if (emptyKey) {
        let find = this.areaTips.find((one) => {
          return one.key === emptyKey;
        });
        return "请选择" + find.label;
      }
      return "";
    },
    levelKey() {
      return this.areaTips[this.level - 1].key;
    },
    currentListVal() {
      return this.areaData[this.currentListKey].id;
    },
  },
  created() {
    let index = 0;
    let obj = {};
    this.areaTips.forEach((one) => {
      if (index >= this.level) {
        return;
      }
      index++;
      obj[one.key] = { id: "", label: "" };
    });
    this.areaData = JSON.parse(
      JSON.stringify(Object.assign(obj, this.chooseData))
    );
    if (!this.areaJson.length) {
      this.areaAllData = JSON.parse(JSON.stringify(areaJson));
    } else {
      this.areaAllData = JSON.parse(JSON.stringify(this.areaJson));
    }
    this.showArea();
  },
  methods: {
    getAreaList(prefix, level) {
      let options = [];
      if (!prefix || !level) {
        let objJson = this.areaAllData[0];
        for (let key in objJson) {
          let obj = { id: key, label: objJson[key] };
          options.push(obj);
        }
      } else {
        let objJson = this.areaAllData[level];
        for (let key in objJson) {
          if (key.toString().indexOf(prefix) === 0) {
            let obj = { id: key, label: objJson[key] };
            options.push(obj);
          }
        }
      }
      return options;
    },
    showArea() {
      let level = 0;
      let prefix = "";
      let prekKeyVal = "";
      let emptyKey = "";
      for (let key in this.areaData) {
        if (!this.areaData[key].id) {
          emptyKey = key;
          break;
        } else {
          prekKeyVal = this.areaData[key].id;
        }
      }
      level = this.areaTips.findIndex((one) => {
        return one.key === emptyKey;
      });
      if (level === -1 || level > this.level - 1) {
        level = this.level - 1;
      }
      this.currentListKey = this.areaTips[level].key;
      this.listTipText = "请选择" + this.areaTips[level].label;
      prefix = prekKeyVal ? prekKeyVal.substr(0, 2 * Number(level)) : "";
      this.areaList = this.getAreaList(prefix, level);
    },
    chooseItem(item) {
      let keyIndex = 0;
      let currentKeyIndex = null;
      for (let key in this.areaData) {
        keyIndex = this.areaTips.findIndex((one) => {
          return one.key === key;
        });
        if (key === this.currentListKey) {
          currentKeyIndex = keyIndex;
          this.areaData[key] = Object.assign({ label: "", id: "" }, item);
        } else if (
          (currentKeyIndex || currentKeyIndex === 0) &&
          keyIndex > currentKeyIndex
        ) {
          this.areaData[key] = Object.assign({}, { label: "", id: "" });
        }
      }
      this.showArea();
    },
    chooseTextClick(key, item) {
      if (key === this.currentListKey) {
        return;
      } else {
        let level = this.areaTips.findIndex((one) => {
          return one.key === key;
        });
        this.currentListKey = key;
        this.listTipText = "请选择" + this.areaTips[level].label;
        if (level === 0) {
          this.areaList = this.getAreaList();
          return;
        }
        let prekKeyVal = this.areaData[this.areaTips[Number(level - 1)]["key"]]
          .id;
        let prefix = prekKeyVal ? prekKeyVal.substr(0, 2 * Number(level)) : "";
        this.areaList = this.getAreaList(prefix, level);
      }
    },
  },
};
</script>
<style scoped>
.area-template {
  width: 200px;
  background: #eee;
  font-size: 12px;
}
.area-template .area-title {
  text-align: center;
  padding: 10px 0;
}
.area-choose {
  padding: 0 10px;
}
.area-choose-item {
  cursor: pointer;
  line-height: 30px;
  position: relative;
}
.area-choose-item .circle {
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 1px solid #333;
  border-radius: 50%;
  box-sizing: border-box;
}
.area-choose-item .area-choose-item_label {
  display: inline-block;
  margin-left: 4px;
}
.area-choose-item .line {
  width: 1px;
  height: 22px;
  background: #333;
  position: absolute;
  top: 20px;
  left: 3px;
}
.area-choose-item.area-choose-item_active .circle {
  border-color: orange;
}
.area-choose-item.area-choose-item_active .area-choose-item_label {
  color: orange;
}
.area-choose-item.area-choose-item_active .line {
  background: orange;
}
.area-list-wrap {
  border-top: 1px solid #ddd;
  height: 200px;
  overflow: auto;
}
.area-list-title,
.area-list-item {
  padding: 0 10px;
  line-height: 30px;
}
.area-list-item {
  cursor: pointer;
}
.area-list-item.area-list-item_active {
  color: orange;
}
</style>
