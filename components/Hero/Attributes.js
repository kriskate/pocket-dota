import { StyleSheet, View } from "react-native";
import { assets } from "../../constants/Data";


const Attribute = ({ src, bval, lval }) => (
  <View style={styles.attribute}>
    <Image source={assets.attributes[src]} />
    <Text> {bval}{lval ? ` + ${lval} /lvl` : ''} </Text>
  </View>
)

export default class extends React.Component {
  render() {
    return (
      <View style={styles.attributes}>
        <Text style={styles.attributesText}>Attributes:</Text>
        <Attribute src='agi' bval={attributes.AttributeBaseAgility} lval={Number(attributes.AttributeAgilityGain)} />
        <Attribute src='int' bval={attributes.AttributeBaseIntelligence} lval={Number(attributes.AttributeIntelligenceGain)} />
        <Attribute src='str' bval={attributes.AttributeBaseStrength} lval={attributes.AttributeBaseStrength} />
        <Attribute src='attack' bval={`${attributes.AttackDamageMin} - ${attributes.AttackDamageMax}`} />
        <Attribute src='defense' bval={attributes.ArmorPhysical} />
        <Attribute src='speed' bval={attributes.MovementSpeed} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attributesText: {
    textAlign: 'center',
    backgroundColor: Colors.dota_ui2,
  },
  attributes: {
    borderRadius: 3,
    borderWidth: 3,
    borderColor: Colors.dota_ui2,

    justifyContent: 'space-around',
    alignContent: 'flex-end',
  },
})