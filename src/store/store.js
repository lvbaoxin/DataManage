import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
  PersonFormData: {
    householdNumber: '',
    idCard: '',
    householder: '',
    personName: '',
    buildingPlace:'',
    relations: '',
    populations: '',
    tenancyTime: '',
    qualifications: '',
    houseOwnership: '',
    sex: '',
    birth: '',
    nation: '',
    nativePlace: '',
    maritalStatus: '',
    politicalStatus: '',
    skills: '',
    occupationStatus: '',
    contact: '',
    servicePlace: '',
    domicileAddress: ''
  },
  nav: [],
  orgFormData: {},
  // 地
  showAddressForm: [],
  AddressForm: {},
  // 党员信息
  partyData: {},
  jiaoZhengFormData: {},
  WenKongFormData: {},
  // GIS坐标
  GisPosition:[]
}

var mutations = {
  AddPersonFormData(state, value) {
    state.PersonFormData = value;
  },
  AddOrgFormData(state, value) {
    state.orgFormData = value;
  },
  AddNav(state, value) {
    state.nav = value;
  },
  AddshowAddressForm(state, value) {
    state.showAddressForm = value;
  },
  AddAddressFormData(state, value) {
    state.AddressForm = value;
  },
  AddPartyData(state, value) {
    state.partyData = value;
  },
  AddJiaoZhengData(state, value) {
    state.jiaoZhengFormData = value;
  },
  AddWenKongData(state, value) {
    state.WenKongFormData = value;
  },
  AddGisPosition(state, value) {
    state.GisPosition = value;
  },
}

export default new Vuex.Store({
  state,
  mutations
})
