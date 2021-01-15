import React, { Component } from 'react';

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
        height: `${h}mm`,
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
        <div style={(props.width && props.height) ? Rectangle(props.x, props.y, props.width, props.height, props.style) : Position(props.x, props.y, props.style)}>{props.children}</div>
    );
}

function Art(src) {
    return (
        <Image x="6.98" y="15.77" width="45.05" height="44.89" src={src} />
    );
}

function Border(name) {
    return (
        <Image width="59" height="86" src={`/ygo/border/${name}.png`} />
    );
}

function Name(name) {
    return (
        <Text x="4" y="2.89" width="45" height="5.61">
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

function Types(types) {
    return (
        <Text x="4.5" y="64" width="42.21" height="2.87" style={{ "font-size": "2.5mm", "font-weight": "bold" }}>
            {`[${types.join('/')}]`}
        </Text>
    );
}

function Description(text) {
    return (
        <Text x="4.4" y="67" width="50.35" height="10.92" style={{ "font-size": "1.8mm", "font-style": "italic" }}>
            {text}
        </Text>
    );
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
            {Description(props.description)}
            {AtkAndDef(props.attack, props.defense)}
        </>
    );
}

function NormalPendulumMonster(props) {

}

function EffectMonster(props) {

}

function EffectPendulumMonster(props) {

}

function EffectRitualMonster(props) {

}

function FusionMonster(props) {

}

function FusionPendulumMonster(props) {

}

function SyncroMonster(props) {

}

function SyncroPendulumMonster(props) {

}

function XyzMonster(props) {

}

function XyzPendulumMonster(props) {

}

function LinkMonster(props) {

}

function Spell(props) {

}

function Trap(props) {

}

function Invalid(offender) {
    return (
        <div style={{ color: "white" }} >
            {Art("/ygo/error/Mischief of the Gnomes.png")}
            {Border("Error")}
            {Name("Uh oh!")}
            {Attribute("わらい")}
            {Description(`The collection [${offender.types.join("/")}] is not a valid card type. Error with card "${offender.name}."`)}
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
            return EffectRitualMonster(props);

        case Fingerprint.fusion:
            return FusionMonster(props);

        case Fingerprint.fusion + Fingerprint.pendulum:
            return FusionPendulumMonster(props);

        case Fingerprint.syncro:
            return SyncroMonster(props);

        case Fingerprint.syncro + Fingerprint.pendulum:
            return SyncroPendulumMonster(props);

        case Fingerprint.xyz:
            return XyzMonster(props);

        case Fingerprint.pendulum:
            return XyzPendulumMonster(props);

        case Fingerprint.link:
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
export function Card(props) {
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