import princesaGalactica from '../src/assets/avatar.assets/princesaGalactica.png'
import recicledBoy from '../src/assets/avatar.assets/recicledBoy.png'
import recicledGollum from '../src/assets/avatar.assets/recicledGollum.png'
import SuperNature from '../src/assets/avatar.assets/SuperNature.png'
import mrBotellita from '../src/assets/avatar.assets/mrBotellita.png'
import niñaRama from '../src/assets/avatar.assets/niñaRama.png'
import neoShrek from '../src/assets/avatar.assets/neoShrek.png'
import emoNature from '../src/assets/avatar.assets/emoNature.png'
import hipstree from '../src/assets/avatar.assets/hipstree.png'

const imgAvatar = (img) => {
  const avatarMap = {
    mrBotellita,
    emoNature,
    hipstree,
    neoShrek,
    niñaRama,
    princesaGalactica,
    recicledBoy,
    recicledGollum,
    SuperNature,
  }
  return avatarMap[img] || null
}
export default imgAvatar
