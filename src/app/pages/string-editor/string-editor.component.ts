import { Component, OnInit } from '@angular/core';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-string-editor',
  templateUrl: './string-editor.component.pug',
  styleUrls: ['./string-editor.component.scss']
})
export class StringEditorComponent implements OnInit {
  emojis: string = '😀😃😄😁😆😅🤣😂🙂🙃😉😊😇😍🤩😘😗☺😚😙😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😶‍🌫️😏😒🙄😬😮‍💨🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧😵😵‍💫🤯🤠😎🤓🧐😕😟🙁☹😮😯😲😳😦😧😨😰😥😢😭😱😖😣😞😓😩😫😤😡😠🤬😈👿💀☠💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾🙈🙉🙊💋💌💘💝💖💗💓💞💕💟❣💔❤️‍🔥❤️❤🧡💛💚💙💜🖤💯💢💥💫💦💨🕳💣💬👁️‍🗨️🗨🗯💭💤👋🤚🖐✋🖖👌👁👅👄👶🧒👦👧🧑👱👨🧔🧔‍♂️🧔‍♀️👩👩‍‍🔧👨‍🔧👩‍🔧🧑‍🏭👨‍🏭👩‍🏭🧑‍💼👨‍💼👩‍💼🧑‍🔬👨‍🔬👩‍🔬🧑‍💻👨‍💻👩‍💻🧑‍🎤👨‍🎤👩‍🎤🧑‍🎨👨‍🎨👩‍🎨🧑‍✈️👨‍✈️👩‍✈️🧑‍🚀👨‍🚀👩‍🚀🧑‍🚒👨‍🚒👩‍🚒👮👮‍♂️👮‍♀️🕵🕵️‍♂️🕵️‍♀️💂💂‍♂️💂‍♀️👷👷‍♂️👷‍♀️🤴👸👳👳‍♂️👳‍♀️👲🧕🤵🤵‍♂️🤵‍♀️👰👰‍♂️👰‍♀️🤰🤱👩‍🍼👨‍🍼🧑‍🍼👼🎅🤶🧑‍🎄🧙🧙‍♂️🧙‍♀️🧚🧚‍♂️🧚‍♀️🧛🧛‍♂️🧛‍♀️🧜🧜‍♂️🧜‍♀️🧝🧝‍♂️🧝‍♀️🧞🧞‍♂️🧞‍♀️🧟🧟‍♂️🧟‍♀️💆💆‍♂️💆‍♀️💇💇‍♂️💇‍♀️🚶🚶‍♂️🚶‍♀️🏃🏃‍♂️🏃‍♀️💃🕺🕴👯👯‍♂️👯‍♀️🧖🧖‍♂️🧖‍♀️🧗🧗‍♂️🧗‍♀️🤺🏇⛷🏂🏌🏌️‍♂️🏌️‍♀️🏄🏄‍♂️🏄‍♀️🚣🚣‍♂️🚣‍♀️🏊🏊‍♂️🏊‍♀️⛹⛹️‍♂️⛹️‍♀️🏋🏋️‍♂️🏋️‍♀️🚴🚴‍♂️🚴‍♀️🚵🚵‍♂️🚵‍♀️🤸🤸‍♂️🤸‍♀️🤼🤼‍♂️🤼‍♀️🤽🤽‍♂️🤽‍♀️🤾🤾‍♂️🤾‍♀️🤹🤹‍♂️🤹‍♀️🧘🧘‍♂️🧘‍♀️🛀🛌🧑‍🤝‍🧑👭👫👬💏👩‍❤️‍💋‍👨👨‍❤️‍💋‍👨👩‍❤️‍💋‍👩💑👩‍❤️‍👨👨‍❤️‍👨👩‍❤️‍👩👪👨‍👩‍👦👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👦👨‍👦‍👦👨‍👧👨‍👧‍👦👨‍👧‍👧👩‍👦👩‍👦‍👦👩‍👧👩‍👧‍👦👩‍👧‍👧🗣👤👣🐵🐒🦍🐶🐕🐩🐺🦊🦝🐱🐈🐈‍⬛🦁🐯🐅🐆🐴🐎🦄🦓🦌🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦒🐘🦏🐭🐁🐀🐹🐰🐇🦔🦇🐻🐻‍❄️🐨🐼🕊🦅🦆🦉🐞🦗🕷🕸🦂🏵🌹🥀🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿☘🍀🍁🍂🍃🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🥝🍅🥥🥑🍆🥔🥕🌽🌶🥒🥦🍄🥜🌰🍞🥐🥖🥨🥙🥚🍳🥘🍲🥣🥗🍿🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🍽🍴🥄🔪🏺🌍🌎🌏🌐🗺🗾'
  text: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  originalText: string = ''
  mode = ''
  controls = [
    {
      name: 'Emojify',
      cmd: 'emojify'
    },
    {
      name: 'camelCase',
      cmd: 'toCamelCase'
    },
    {
      name: 'PascalCase',
      cmd: 'toPascalCase'
    },
    {
      name: 'Underscores',
      cmd: 'addUnderscores'
    },
    {
      name: 'Hyphens',
      cmd: 'addHyphens'
    },
    {
      name: 'To array',
      cmd: 'toArray'
    },
    {
      name: 'Reset',
      cmd: 'reset'
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.originalText = this.text
  }

  runCmd(cmd) {
    this.text = this.originalText
    this.text = this[cmd](this.text)
    this.mode = cmd
    this.copyToClipboard()
  }

  reset() {
    return this.originalText
  }

  copyToClipboard() {
    let copyText: any = document.querySelector("textarea")
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy")
  } 

  textChanged() {
    if (this.mode == '' || this.mode == 'reset') this.originalText = this.text
  }

  toArray(str) {
    str = str.replace(/(?:\r\n|\r|\n)/g, ' ')
    str = str.replace(/ +(?= )/g,'')
    str = str.split(' ')
    str = str.join('", "')
    str = '["' + str + '"]'
    return str
  }

  toCamelCase(str) {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    });
  };

  addUnderscores(str) {
    return str.replace(/ /g, '_');
  };

  addHyphens(str) {
    return str.replace(/ /g, '-');
  };

  toPascalCase(str) {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
      if (p2) return p2.toUpperCase();
      return p1.toUpperCase();
    });
  };

  emojify(str) {
    let randomEmoji = () => {
      let emojis = Array.from(this.emojis),
        emoji = emojis[Math.floor(Math.random() * emojis.length)],
        hex: any
      if (emoji.length < 4) {
        hex = emoji.codePointAt(0).toString(16)
      } else {
        hex = emoji.codePointAt(0).toString(16) + '-' + emoji.codePointAt(2).toString(16)
      }
      hex = "0x" + hex.toString("16")
      return String.fromCodePoint(hex)
    };

    let words = str.split(' '), wordsWithEmojis = []
    words.forEach(word => {
      wordsWithEmojis.push(word + ' ' + randomEmoji() + ' ')
    })
    return wordsWithEmojis.join('')
  }

}
