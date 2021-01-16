import React, { useState, useEffect } from 'react';

const MM_2_PIXEL_MULTIPLIER = 3.7795275591;
var running_counter = 0;
function unique_id() {
  return running_counter++;
}

// This stuff is here to get some css bs out of the way.
// I cannot for the life of me remember how to do this properly every time
// and doing this as well as having custom styles was a treat to use.
function Position(x, y, style) {
  return {
    position: "absolute",
    left: `${x ?? 0}mm`,
    top: `${y ?? 0}mm`,
    "offset-position": `${x}mm ${y}mm`,
    ...style
  }
}

function Rectangle(x, y, w, h, style) {
  return {
    position: "absolute",
    left: `${x ?? 0}mm`,
    top: `${y ?? 0}mm`,
    width: `${w}mm`,
    height: h ? `${h}mm` : undefined,
    ...style
  }
}

// Image and Text mirror the functionalities of the ``image`` and ``text`` tags of SVG
// Getting everything positioned and working with svg was really nice but it's not 1 to 1
// Major difference being href is replaced with src to be more inline with html.
// In short, this takes the good of SVG while eliminating the bad.
//
// Oh and in case it's not apparent, all positional values are measured in mm.
function Image(props) {
  return (
    <img style={Rectangle(props.x, props.y, props.width, props.height, props.style)} src={props.src} alt="" />
  );
}

function Text(props) {
  return (
    <div id={props.id} style={(props.width) ? Rectangle(props.x, props.y, props.width, props.height, props.style) : Position(props.x, props.y, props.style)}>{props.children}</div>
  );
}

function FitText(props) {
  const [[size, id], setSize] = useState([props.font_size, unique_id()]);

  useEffect(() => {
    console.log(id);
    let description = document.getElementById(id);
    if (description.scrollHeight >= props.height * MM_2_PIXEL_MULTIPLIER && size > 0.1) {
      setSize([size - 0.1, id]);
    }
  }, [size, id, props.height]);

  return (
    <Text id={id} x={props.x} y={props.y} width={props.width} style={{ "font-size": `${size}mm`, "line-height": `${size}mm`, ...props.style }}>
      {props.children}
    </Text>
  );
}

function Art(src) {
  return (
    <Image x="6.98" y="15.5" width="45.05" height="44.89" src={src} />
  );
}

function Border(name) {
  return (
    <Image width="59" height="86" src={`/ygo/border/${name}.png`} />
  );
}

function Name(name, style = {}) {
  const height = 5.61;
  let [[stretch, id], setStretch] = useState([height, unique_id()]);

  useEffect(() => {
    let title = document.getElementById(id);
    console.log(title.scrollHeight);
    //please do not ask about the multiplier, please
    //It keeps changing values to make sure the thing actually stops where it needs to stop.
    //Before it was the pixel thingy at the top, then it was 5 point something and not it's exactly 6.
    //I am gettng these though math shit (aka me dividing 2.5 by 15 because 1 card was acting really fucky for no reason)
    //Stretch is used here because the target size height should be stretch
    //(transform doesn't effect the measured size for some ungodly reason)
    if (title.scrollHeight > stretch * 6 && stretch > 2) {
      setStretch([stretch - 0.1, id]);
    }
  }, [stretch, id])

  //TODO: I have no way of verifying that it works. The offsets work _well enough_
  //Do not let this go below 2 though because it will flip the fuck out.
  //Doing this because font-squish dosen't work for some god forsaken reason and squishing horisontally dosen't fix the text wrapping problem.
  //Also I have no idea how the true center evolves this is just a shot in the dark.
  //It just looks good enough
  //Also don't ask about the multiplier here either. Same reason as before except it's even more subjective here.
  return (
    <Text id={id} x="4" y={2 + 1.6 * (height / stretch - 1)} width="46" style={{ "font-size": `${stretch}mm`, transform: `scaleY(${height / stretch})`, ...style }}>
      {name}
    </Text>
  );
}

function Attribute(attrib) {
  return (
    <Image x="49.5" y="4" width="5.61" height="5.61" src={`/ygo/attribute/${attrib}.png`} />
  )
}

function Level(level) {
  let dragon_balls = [];
  for (let i = 0; i < level; i++) {
    dragon_balls.push((
      <Image x={`${i * -4 + 49.5}`} y="10.5" width="3.65" height="3.65" src="/ygo/star/Normal.png" />
    ));
  }

  return dragon_balls;
}

function Rank(rank) {
  let evil_dragon_balls = [];
  for (let i = 0; i < rank; i++) {
    evil_dragon_balls.push((
      <Image x={`${i * 4 + 6.10}`} y="10.5" width="3.65" height="3.65" src="/ygo/star/Xyz.png" />
    ));
  }

  return evil_dragon_balls;
}

function Types(types) {
  return (
    <Text x="4.5" y="64" width="42.21" height="2.87" style={{ "font-size": "2.5mm", "font-weight": "bold" }}>
      {`[${types.join('/')}]`}
    </Text>
  );
}

function Description(text) {
  return (<FitText x="4.4" y="67.5" width="50.35" height="10.9" font_size={1.8}>
    {text}
  </FitText>);
}

function NormalDescription(text) {
  return (
    <FitText x="4.4" y="67" width="50.35" height="10.92" font_size="1.8" style={{ "font-style": "italic" }}>
      {text}
    </FitText>
  );
}

function SpellAndTrapDescription(text) {
  return (<FitText x="4.4" y="65" width="50.35" height="16.7" font_size={1.8}>
    {text}
  </FitText>);
}


function AtkAndDef(atk, def) {
  return (
    <>
      <Text x="36.97" y="77.8" width="6.69" height="2" style={{ "text-align": "center", "font-size": "1.83mm" }}>
        {atk}
      </Text>
      <Text x="48.97" y="77.8" width="4.72" height="2" style={{ "text-align": "center", "font-size": "1.83mm" }}>
        {def}
      </Text>
    </>
  );
}

function AtkAndLink(atk, link) {
  return (
    <>
      <Text x="36.97" y="77.8" width="6.69" height="2" style={{ "text-align": "center", "font-size": "1.83mm" }}>
        {atk}
      </Text>
      <Text x="50.5" y="77.8" width="4.72" height="2" style={{ "text-align": "center", "font-size": "1.83mm", transform:"scaleX(2)" }}>
        {link}
      </Text>
    </>
  );
}

function PendulumArt(src) {
  return (
    <Image x="3.54" y="15.4" width="51.92" height="38.74" src={src} />
  );
}

function PendulumScale(scale) {
  return (
    <>
      <Text x="4" y="59" width="4" height="3.15" style={{ "text-align": "center", "font-size": "3.15mm" }}>{scale}</Text>
      <Text x="51" y="59" width="4" height="3.15" style={{ "text-align": "center", "font-size": "3.15mm" }}>{scale}</Text>
    </>
  );
}

function PendulumEffect(text) {
  return (
    <FitText x="8.8" y="54" width="41.7" height="9.64" font_size="1.7">
      {text}
    </FitText>
  );
}

function SpellAndTrapIndicator(text, property=undefined) {
  let icon = property ? (<img style={{width:"3.15mm", height:"3.15mm"}} src={`/ygo/icon/${property}.png`} alt=""/>) : (<></>);

  return (<Text x="29.89" y="9.7" width="23.6" height="3.15" style={{"text-align":"right", "font-size":"3.15mm"}}>
    [{text}{icon}]
  </Text>);
}

function LinkArrows(arrows) {
  //All combinations of arrows
  // top_left
  // top_center
  // top_right
  // middle_left
  // middle_right
  // bottom_left
  // bottom_center
  // bottom_right

  const Arrows = [
    [
      "top_left",
      (<Image x="4.93" y="13.52" width="5.91" height="5.91" src="/ygo/marker/topLeft.png"/>)
    ],
    [
      "top_center",
      (<Image x="24.36" y="12.39" width="10.7" height="3.52" src="/ygo/marker/topCenter.png"/>)
    ],
    [
      "top_right",
      (<Image x="48.16" y="13.52" width="5.91" height="5.91" src="/ygo/marker/topRight.png"/>)
    ],
    [
      "middle_left",
      (<Image x="3.80" y="32.67" width="3.52" height="10.70" src="/ygo/marker/middleLeft.png"/>)
    ],
    [
      "middle_right",
      (<Image x="51.68" y="32.67" width="3.52" height="10.70" src="/ygo/marker/middleRight.png"/>)
    ],
    [
      "bottom_left",
      (<Image x="5.07" y="56.75" width="5.91" height="5.91" src="/ygo/marker/bottomLeft.png"/>)
    ],
    [
      "bottom_center",
      (<Image x="24.36" y="60.41" width="10.70" height="3.52" src="/ygo/marker/bottomCenter.png"/>)
    ],
    [
      "bottom_right",
      (<Image x="48.44" y="56.75" width="5.91" height="5.91" src="/ygo/marker/bottomRight.png"/>)
    ]
  ];

  return Arrows.filter(([position, _]) => arrows[position]).map(([_, element]) => element);
}

// "Why have relativly simple things be part of tiny functions? Why not put it in as 1 liners"
// 2 reasons, 1 fake and 1 real. Keeping stuff in tiny components makes the components of the card renderer
// modular™ and scalable™. (though I would still do it for 1 off stuff)
// It's not entierly untrue either, I've already used the Art, Border, and Description in the failsafe
// and because of that it took like a minute to get it working (which felt hella good)
//
// That's not the real reason though. In reality, helps me focus and organize my thoughts.
// I tried having everything mushed together in 1 spot to get it out quickly and all the code in 1 function
// overwhelmed me. Legit it made me feel like dogshit and a fake programmer when I was getting overwhelmed
// at my own code. With this, I was able to fucking finish something with this approach and re-factor it in a matter of
// minutes! So that's how i'm doing it and I hope whoever is reading this does the same. It might help you out as well.
function NormalMonster(props) {
  return (
    <>
      {Art(props.art)}
      {Border("Normal")}
      {Name(props.name)}
      {Attribute(props.attribute)}
      {Level(props.level)}
      {Types(props.types)}
      {NormalDescription(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function NormalPendulumMonster(props) {
  return (
    <>
      {PendulumArt(props.art)}
      {Border("Normal.pendulum")}
      {Name(props.name)}
      {Attribute(props.attribute)}
      {Level(props.level)}
      {PendulumScale(props.pendulum_scale)}
      {PendulumEffect(props.pendulum_effect)}
      {Types(props.types)}
      {NormalDescription(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function EffectMonster(props) {
  return (
    <>
      {Art(props.art)}
      {Border("Effect")}
      {Name(props.name)}
      {Attribute(props.attribute)}
      {Level(props.level)}
      {Types(props.types)}
      {Description(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function EffectPendulumMonster(props) {
  return (
    <>
      {PendulumArt(props.art)}
      {Border("Effect.pendulum")}
      {Name(props.name)}
      {Attribute(props.attribute)}
      {Level(props.level)}
      {PendulumScale(props.pendulum_scale)}
      {PendulumEffect(props.pendulum_effect)}
      {Types(props.types)}
      {Description(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function RitualMonster(props) {
  return (
    <>
      {Art(props.art)}
      {Border("Ritual")}
      {Name(props.name)}
      {Attribute(props.attribute)}
      {Level(props.level)}
      {Types(props.types)}
      {Description(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function FusionMonster(props) {
  return (
    <>
      {Art(props.art)}
      {Border("Fusion")}
      {Name(props.name)}
      {Attribute(props.attribute)}
      {Level(props.level)}
      {Types(props.types)}
      {Description(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function FusionPendulumMonster(props) {
  return (<>
    {PendulumArt(props.art)}
    {Border("Fusion.pendulum")}
    {Name(props.name)}
    {Attribute(props.attribute)}
    {Level(props.level)}
    {PendulumScale(props.pendulum_scale)}
    {PendulumEffect(props.pendulum_effect)}
    {Types(props.types)}
    {Description(props.description)}
    {AtkAndDef(props.attack, props.defence)}
  </>);
}

function SyncroMonster(props) {
  return (
    <>
      {Art(props.art)}
      {Border("Synchro")}
      {Name(props.name)}
      {Attribute(props.attribute)}
      {Level(props.level)}
      {Types(props.types)}
      {Description(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function SyncroPendulumMonster(props) {
  return (<>
    {PendulumArt(props.art)}
    {Border("Synchro.pendulum")}
    {Name(props.name)}
    {Attribute(props.attribute)}
    {Level(props.level)}
    {PendulumScale(props.pendulum_scale)}
    {PendulumEffect(props.pendulum_effect)}
    {Types(props.types)}
    {Description(props.description)}
    {AtkAndDef(props.attack, props.defence)}
  </>);
}

function XyzMonster(props) {
  return (
    <>
      {Art(props.art)}
      {Border("Xyz")}
      {Name(props.name, { color: "white" })}
      {Attribute(props.attribute)}
      {Rank(props.rank)}
      {Types(props.types)}
      {Description(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function XyzPendulumMonster(props) {
  return (
    <>
      {PendulumArt(props.art)}
      {Border("Xyz.pendulum")}
      {Name(props.name, { color: "white" })}
      {Attribute(props.attribute)}
      {Rank(props.rank)}
      {PendulumScale(props.pendulum_scale)}
      {PendulumEffect(props.pendulum_effect)}
      {Types(props.types)}
      {Description(props.description)}
      {AtkAndDef(props.attack, props.defence)}
    </>
  );
}

function LinkMonster(props) {
  return (
    <>
      {Art(props.art)}
      {Border("Link")}
      {Name(props.name)}
      {Attribute(props.attribute)}
      {Types(props.types)}
      {Description(props.description)}
      {AtkAndLink(props.attack, props.link)}
      {LinkArrows(props.link_arrows)}
    </>
  );
}

function Spell(props) {
  return (<>
    {Art(props.art)}
    {Border("Spell")}
    {Name(props.name, { color: "white" })}
    {Attribute("Spell")}
    {SpellAndTrapIndicator("Spell card", props.property)}
    {SpellAndTrapDescription(props.description)}
</>);
}

function Trap(props) {
  return (<>
      {Art(props.art)}
      {Border("Trap")}
      {Name(props.name)}
      {Attribute("Trap")}
      {SpellAndTrapIndicator("Trap card", props.property)}
      {SpellAndTrapDescription(props.description)}
  </>);
}

function Invalid(offender) {
  return (
    <div style={{ color: "white" }} >
      {Art("/ygo/error/Mischief of the Gnomes.png")}
      {Border("Error")}
      {Name("Uh oh!")}
      {Attribute("わらい")}
      {Description(`The card "${offender.name}" generated this fingerprint "${GenerateFingerprint(offender.types)}" which is invalid."`)}
    </div>
  );
}

//Before it was using weird abbreviations
//I'm doing this because it's the most clear way
//of getting my intent across.
const Fingerprint = {
  normal: "Normal",
  effect: "Effect",
  ritual: "Ritual",
  fusion: "Fusion",
  syncro: "Synchro",
  xyz: "Xyz",
  pendulum: "Pendulum",
  link: "Link",
  spell: "Spell",
  trap: "Trap",
}

// This function re-orders the types in a way that
// allows it to be used in a switch statement.
// The ordering is
// Normal -> Effect -> Ritual -> Fusion -> Synchro -> Xyz -> Pendulum -> Link -> Spell -> Trap
// I'm not 100% sure if I should put link that far back and the structure is up for debate.
function GenerateFingerprint(types) {
  let fingerprint = "";

  if (types.includes(Fingerprint.normal)) {
    fingerprint += Fingerprint.normal;
  }

  if (types.includes(Fingerprint.effect)) {
    fingerprint += Fingerprint.effect;
  }

  if (types.includes(Fingerprint.ritual)) {
    fingerprint += Fingerprint.ritual;
  }

  if (types.includes(Fingerprint.fusion)) {
    fingerprint += Fingerprint.fusion;
  }

  if (types.includes(Fingerprint.syncro)) {
    fingerprint += Fingerprint.syncro;
  }

  if (types.includes(Fingerprint.xyz)) {
    fingerprint += Fingerprint.xyz;
  }

  if (types.includes(Fingerprint.pendulum)) {
    fingerprint += Fingerprint.pendulum;
  }

  if (types.includes(Fingerprint.link)) {
    fingerprint += Fingerprint.link;
  }

  if (types.includes(Fingerprint.spell)) {
    fingerprint += Fingerprint.spell;
  }

  if (types.includes(Fingerprint.trap)) {
    fingerprint += Fingerprint.trap;
  }

  if (fingerprint === "") {
    fingerprint += Fingerprint.normal;
  }

  return fingerprint;
}

function CardBranch(props) {
  switch (GenerateFingerprint(props.types)) {
    case Fingerprint.normal:
      return NormalMonster(props);

    case Fingerprint.normal + Fingerprint.pendulum:
      return NormalPendulumMonster(props);

    case Fingerprint.effect:
      return EffectMonster(props);

    case Fingerprint.effect + Fingerprint.pendulum:
      return EffectPendulumMonster(props);

    case Fingerprint.effect + Fingerprint.ritual:
      return RitualMonster(props);

    case Fingerprint.effect + Fingerprint.fusion:
      return FusionMonster(props);

    case Fingerprint.effect + Fingerprint.fusion + Fingerprint.pendulum:
      return FusionPendulumMonster(props);

    case Fingerprint.effect + Fingerprint.syncro:
      return SyncroMonster(props);

    case Fingerprint.effect + Fingerprint.syncro + Fingerprint.pendulum:
      return SyncroPendulumMonster(props);

    case Fingerprint.effect + Fingerprint.xyz:
      return XyzMonster(props);

    case Fingerprint.effect + Fingerprint.xyz + Fingerprint.pendulum:
      return XyzPendulumMonster(props);

    case Fingerprint.effect + Fingerprint.link:
      return LinkMonster(props);

    case Fingerprint.spell:
      return Spell(props);

    case Fingerprint.trap:
      return Trap(props);

    default:
      return Invalid(props);
  }
}

//Here is where whole card transforms will be applied
//Atm functionality is not here because I have a bunch of other
//functions to take care of.
function Card(props) {
  return (
    <div>
      {
        CardBranch(props.data)
      }
    </div>
  );
}

export function CardTest() {
    // Currently card renderer not flexable to render the description properly
    let data_knight = {
      types: ["Warrior"],
      name: "Noble Knight Artorigus",
      art: "/ygo/artworks/Noble Knight Artorigus.png",
      attribute: "Light",
      level: 4,
      description: "No one shall ever know the truth behind That fateful day. Artorigus went forth To where the brilliant sword didst lay. ‘Twas the first of many feats so great, A legend through and through. We sing of him, Artorigus, the Noble and the brave. -From the Tales of the Noble Knights",
      attack: 1800,
      defense: 1800,
    };

    // Renders without issues.
    let data_bitron = {
        types: ["Cyberse", "Normal"],
        name: "Bitron",
        art: "/ygo/artworks/Bitron.png",
        attribute: "Earth",
        level: 2,
        description: "A new species found in electronic space. There's not much information on it.",
        attack: 200,
        defense: 2000,
    };
    return (
      <Card data={data_bitron} />
    );
  }