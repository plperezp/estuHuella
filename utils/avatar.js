import princesaGalactica from './assets/avatar.assets/princesaGalactica.png'
import recicledBoy from './assets/avatar.assets/recicledBoy.png'
import recicledGollum from './assets/avatar.assets/recicledGollum.png'
import SuperNature from './assets/avatar.assets/SuperNature.png'
import mrBotellita from './assets/avatar.assets/mrBotellita.png'
import niñaRama from './assets/avatar.assets/niñaRama.png'
import neoShrek from './assets/avatar.assets/neoShrek.png'
import emoNature from './assets/avatar.assets/emoNature.png'
import hipstree from './assets/avatar.assets/hipstree.png'

export const imgAvatar = (img) => {
  if (img === 'mrBotellita') {
    return mrBotellita
  } else if (img === 'emoNature') {
    return emoNature
  } else if (img === 'hipstree') {
    return hipstree
  } else if (img === 'neoShrek') {
    return neoShrek
  } else if (img === 'niñaRama') {
    return niñaRama
  } else if (img === 'princesaGalactica') {
    return princesaGalactica
  } else if (img === 'recicledBoy') {
    return recicledBoy
  } else if (img === 'recicledGollum') {
    return recicledGollum
  } else if (img === 'SuperNature') {
    return SuperNature
  }
}
