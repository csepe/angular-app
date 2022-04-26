import { outputAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-editor',
  templateUrl: './string-editor.component.pug',
  styleUrls: ['./string-editor.component.scss']
})
export class StringEditorComponent implements OnInit {
  emojis: string = '😀😃😄😁😆😅🤣😂🙂🙃😉😊😇😍🤩😘😗☺😚😙😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😶‍🌫️😏😒🙄😬😮‍💨🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧😵😵‍💫🤯🤠😎🤓🧐😕😟🙁☹😮😯😲😳😦😧😨😰😥😢😭😱😖😣😞😓😩😫😤😡😠🤬😈👿💀☠💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾🙈🙉🙊💋💌💘💝💖💗💓💞💕💟❣💔❤️‍🔥❤️❤🧡💛💚💙💜🖤💯💢💥💫💦💨🕳💣💬👁️‍🗨️🗨🗯💭💤👋🤚🖐✋🖖👌👁👅👄👶🧒👦👧🧑👱👨🧔🧔‍♂️🧔‍♀️👩👩‍‍🔧👨‍🔧👩‍🔧🧑‍🏭👨‍🏭👩‍🏭🧑‍💼👨‍💼👩‍💼🧑‍🔬👨‍🔬👩‍🔬🧑‍💻👨‍💻👩‍💻🧑‍🎤👨‍🎤👩‍🎤🧑‍🎨👨‍🎨👩‍🎨🧑‍✈️👨‍✈️👩‍✈️🧑‍🚀👨‍🚀👩‍🚀🧑‍🚒👨‍🚒👩‍🚒👮👮‍♂️👮‍♀️🕵🕵️‍♂️🕵️‍♀️💂💂‍♂️💂‍♀️👷👷‍♂️👷‍♀️🤴👸👳👳‍♂️👳‍♀️👲🧕🤵🤵‍♂️🤵‍♀️👰👰‍♂️👰‍♀️🤰🤱👩‍🍼👨‍🍼🧑‍🍼👼🎅🤶🧑‍🎄🧙🧙‍♂️🧙‍♀️🧚🧚‍♂️🧚‍♀️🧛🧛‍♂️🧛‍♀️🧜🧜‍♂️🧜‍♀️🧝🧝‍♂️🧝‍♀️🧞🧞‍♂️🧞‍♀️🧟🧟‍♂️🧟‍♀️💆💆‍♂️💆‍♀️💇💇‍♂️💇‍♀️🚶🚶‍♂️🚶‍♀️🏃🏃‍♂️🏃‍♀️💃🕺🕴👯👯‍♂️👯‍♀️🧖🧖‍♂️🧖‍♀️🧗🧗‍♂️🧗‍♀️🤺🏇⛷🏂🏌🏌️‍♂️🏌️‍♀️🏄🏄‍♂️🏄‍♀️🚣🚣‍♂️🚣‍♀️🏊🏊‍♂️🏊‍♀️⛹⛹️‍♂️⛹️‍♀️🏋🏋️‍♂️🏋️‍♀️🚴🚴‍♂️🚴‍♀️🚵🚵‍♂️🚵‍♀️🤸🤸‍♂️🤸‍♀️🤼🤼‍♂️🤼‍♀️🤽🤽‍♂️🤽‍♀️🤾🤾‍♂️🤾‍♀️🤹🤹‍♂️🤹‍♀️🧘🧘‍♂️🧘‍♀️🛀🛌🧑‍🤝‍🧑👭👫👬💏👩‍❤️‍💋‍👨👨‍❤️‍💋‍👨👩‍❤️‍💋‍👩💑👩‍❤️‍👨👨‍❤️‍👨👩‍❤️‍👩👪👨‍👩‍👦👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👦👨‍👦‍👦👨‍👧👨‍👧‍👦👨‍👧‍👧👩‍👦👩‍👦‍👦👩‍👧👩‍👧‍👦👩‍👧‍👧🗣👤👣🐵🐒🦍🐶🐕🐩🐺🦊🦝🐱🐈🐈‍⬛🦁🐯🐅🐆🐴🐎🦄🦓🦌🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦒🐘🦏🐭🐁🐀🐹🐰🐇🦔🦇🐻🐻‍❄️🐨🐼🕊🦅🦆🦉🐞🦗🕷🕸🦂🏵🌹🥀🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿☘🍀🍁🍂🍃🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🥝🍅🥥🥑🍆🥔🥕🌽🌶🥒🥦🍄🥜🌰🍞🥐🥖🥨🥙🥚🍳🥘🍲🥣🥗🍿🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🍽🍴🥄🔪🏺🌍🌎🌏🌐🗺🗾'
  text: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  originalText: string = ''
  mode: string = ''
  controls: Array<{ name: string, cmd: string }> = [
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
      name: 'Rovásírás',
      cmd: 'rovasIras'
    },
    {
      name: 'Reset',
      cmd: 'reset'
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.originalText = this.text
    this.rovasIras('A magyarok Árpád vezetésével 895-ben jöttek a Kárpát-medencébe. István 1000-ben lett király.')
  }

  runCmd(cmd: string): void {
    this.text = this.originalText
    this.text = (this as any)[cmd](this.text)
    this.mode = cmd
    this.copyToClipboard()
  }

  reset(): string {
    return this.originalText
  }

  copyToClipboard(): void {
    let copyText: any = document.querySelector("textarea")
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy")
  }

  textChanged(): void {
    if (this.mode == '' || this.mode == 'reset') this.originalText = this.text
  }

  toArray(str: string): string {
    str = str.replace(/(?:\r\n|\r|\n)/g, ' ')
    str = str.replace(/ +(?= )/g, '')
    str = str.split(' ').join('", "')
    str = `["${str}"]`
    return str
  }

  toCamelCase(str: string): string {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match: string, p1: string, p2: string, offset: string) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    });
  };

  addUnderscores(str: string): string {
    return str.replace(/ /g, '_');
  };

  addHyphens(str: string): string {
    return str.replace(/ /g, '-');
  };

  toPascalCase(str: string): string {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match: string, p1: string, p2: string, offset: string) {
      if (p2) return p2.toUpperCase();
      return p1.toUpperCase();
    });
  };

  emojify(str: string): string {
    let randomEmoji = () => {
      let emojis: string[] = Array.from(this.emojis),
        emoji: string = emojis[Math.floor(Math.random() * emojis.length)],
        hex: any
      if (emoji.length < 4) {
        hex = emoji.codePointAt(0)?.toString(16)
      } else {
        hex = emoji.codePointAt(0)?.toString(16) + '-' + emoji.codePointAt(2)?.toString(16)
      }
      hex = "0x" + hex?.toString(16)
      return String.fromCodePoint(Number(hex))
    };

    let words: string[] = str.split(' '), wordsWithEmojis: string[] = []
    words.forEach((word: string) => {
      wordsWithEmojis.push(word + ' ' + randomEmoji() + ' ')
    })
    return wordsWithEmojis.join('')
  }

  rovasIras(str: string): string {
    let output = '';
    const chars: any = { 'á': 'A', 'é': 'E', 'í': 'I', 'ő': 'Q', 'ö': 'q', 'ű': 'W', 'ü': 'w', 'ó': 'O', 'ú': 'U', 'gy': 'G', 'ny': 'N', 'cs': 'C', 'ly': 'L' };
    let reg = new RegExp(Object.keys(chars).join('|'),'gi'); 
    output = str.replace(reg, m => chars[m.toLowerCase()] ?? m);
    return output.split('').reverse().join('');
  }
}
