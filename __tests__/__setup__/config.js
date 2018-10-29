import configureMockStore from 'redux-mock-store'

import data_hero from '../__mocks__/hero';
import data_item from '../__mocks__/item';
import data_player from '../__mocks__/player';
import data_patch from '../__mocks__/patch';
import { model_wiki, model_profile, model_update } from '../../src/constants/Models';

const log = s => {
  process.stdout.write(s + "\n");
};

export const getHeroData = () => data_hero;
export const getItemData = () => data_item;
export const getPatchData = () => data_patch;
export const getPatchName = () => "7.07b";
export const getPlayerData = () => data_player;

const mockStore = configureMockStore();
export const store_simple = mockStore({
  profile: model_profile({}),
  wiki: model_wiki({
    patch_notes: getPatchData(),
  }),
  update: model_update({}),
});

export const navigation = (data = {}) => ({
  getParam: () => data,
  navigate: () => {},
  state: {
    params: {
      player: {}, // StatsWebScreen
    }
  },
})


// export const getAppData = async () => {
//   const data = await loadCurrentWikiInfo();
//   return data;
// }