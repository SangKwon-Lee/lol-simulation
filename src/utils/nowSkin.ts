export function useNowSkin(type: string) {
  if (type === `wardSkin`) {
    return {
      count: 1,
      name: `wardSkin`,
      url: `/images/ward.png`,
      type: 'other'
    };
  } else if (type === 'orangeEssence') {
    return {
      count: 525,
      name: `orangeEssence`,
      url: `/images/orange_essence.png`,
      type: 'other'
    };
  } else if (type === 'mythicEssence') {
    return {
      count: 10,
      name: `mythicEssence`,
      url: `/images/mythic_essence.png`,
      type: 'other'
    };
  } else if (type === 'emotion') {
    return {
      count: 1,
      name: `emotion`,
      url: `/images/emotion.png`,
      type: 'other'
    };
  } else if (type === 'bag') {
    return {
      count: 1,
      name: 'bag',
      url: `/images/bag.png`,
      type: 'other'
    };
  } else if (type === 'profileIcon') {
    return {
      count: 1,
      name: `profileIcon`,
      url: `/images/profileIcon.webp`,
      type: 'other'
    };
  } else {
    return {
      count: 1,
      name: `wardSkin`,
      url: `/images/ward.png`,
      type: 'other'
    };
  }
}
