import areaSelectLsq from './components/areaSelectLsq';

const components = [
  areaSelectLsq
];

const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

let comps = {
  install
};

export default comps;
