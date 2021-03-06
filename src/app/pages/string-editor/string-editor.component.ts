import { Component, OnInit } from '@angular/core';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-string-editor',
  templateUrl: './string-editor.component.pug',
  styleUrls: ['./string-editor.component.scss']
})
export class StringEditorComponent implements OnInit {
  emojis: string = '๐๐๐๐๐๐๐คฃ๐๐๐๐๐๐๐๐คฉ๐๐โบ๐๐๐๐๐๐คช๐๐ค๐ค๐คญ๐คซ๐ค๐ค๐คจ๐๐๐ถ๐ถโ๐ซ๏ธ๐๐๐๐ฌ๐ฎโ๐จ๐คฅ๐๐๐ช๐คค๐ด๐ท๐ค๐ค๐คข๐คฎ๐คง๐ต๐ตโ๐ซ๐คฏ๐ค ๐๐ค๐ง๐๐๐โน๐ฎ๐ฏ๐ฒ๐ณ๐ฆ๐ง๐จ๐ฐ๐ฅ๐ข๐ญ๐ฑ๐๐ฃ๐๐๐ฉ๐ซ๐ค๐ก๐ ๐คฌ๐๐ฟ๐โ ๐ฉ๐คก๐น๐บ๐ป๐ฝ๐พ๐ค๐บ๐ธ๐น๐ป๐ผ๐ฝ๐๐ฟ๐พ๐๐๐๐๐๐๐๐๐๐๐๐๐โฃ๐โค๏ธโ๐ฅโค๏ธโค๐งก๐๐๐๐๐ค๐ฏ๐ข๐ฅ๐ซ๐ฆ๐จ๐ณ๐ฃ๐ฌ๐๏ธโ๐จ๏ธ๐จ๐ฏ๐ญ๐ค๐๐ค๐โ๐๐๐๐๐๐ถ๐ง๐ฆ๐ง๐ง๐ฑ๐จ๐ง๐งโโ๏ธ๐งโโ๏ธ๐ฉ๐ฉโโ๐ง๐จโ๐ง๐ฉโ๐ง๐งโ๐ญ๐จโ๐ญ๐ฉโ๐ญ๐งโ๐ผ๐จโ๐ผ๐ฉโ๐ผ๐งโ๐ฌ๐จโ๐ฌ๐ฉโ๐ฌ๐งโ๐ป๐จโ๐ป๐ฉโ๐ป๐งโ๐ค๐จโ๐ค๐ฉโ๐ค๐งโ๐จ๐จโ๐จ๐ฉโ๐จ๐งโโ๏ธ๐จโโ๏ธ๐ฉโโ๏ธ๐งโ๐๐จโ๐๐ฉโ๐๐งโ๐๐จโ๐๐ฉโ๐๐ฎ๐ฎโโ๏ธ๐ฎโโ๏ธ๐ต๐ต๏ธโโ๏ธ๐ต๏ธโโ๏ธ๐๐โโ๏ธ๐โโ๏ธ๐ท๐ทโโ๏ธ๐ทโโ๏ธ๐คด๐ธ๐ณ๐ณโโ๏ธ๐ณโโ๏ธ๐ฒ๐ง๐คต๐คตโโ๏ธ๐คตโโ๏ธ๐ฐ๐ฐโโ๏ธ๐ฐโโ๏ธ๐คฐ๐คฑ๐ฉโ๐ผ๐จโ๐ผ๐งโ๐ผ๐ผ๐๐คถ๐งโ๐๐ง๐งโโ๏ธ๐งโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐๐โโ๏ธ๐โโ๏ธ๐๐โโ๏ธ๐โโ๏ธ๐ถ๐ถโโ๏ธ๐ถโโ๏ธ๐๐โโ๏ธ๐โโ๏ธ๐๐บ๐ด๐ฏ๐ฏโโ๏ธ๐ฏโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐คบ๐โท๐๐๐๏ธโโ๏ธ๐๏ธโโ๏ธ๐๐โโ๏ธ๐โโ๏ธ๐ฃ๐ฃโโ๏ธ๐ฃโโ๏ธ๐๐โโ๏ธ๐โโ๏ธโนโน๏ธโโ๏ธโน๏ธโโ๏ธ๐๐๏ธโโ๏ธ๐๏ธโโ๏ธ๐ด๐ดโโ๏ธ๐ดโโ๏ธ๐ต๐ตโโ๏ธ๐ตโโ๏ธ๐คธ๐คธโโ๏ธ๐คธโโ๏ธ๐คผ๐คผโโ๏ธ๐คผโโ๏ธ๐คฝ๐คฝโโ๏ธ๐คฝโโ๏ธ๐คพ๐คพโโ๏ธ๐คพโโ๏ธ๐คน๐คนโโ๏ธ๐คนโโ๏ธ๐ง๐งโโ๏ธ๐งโโ๏ธ๐๐๐งโ๐คโ๐ง๐ญ๐ซ๐ฌ๐๐ฉโโค๏ธโ๐โ๐จ๐จโโค๏ธโ๐โ๐จ๐ฉโโค๏ธโ๐โ๐ฉ๐๐ฉโโค๏ธโ๐จ๐จโโค๏ธโ๐จ๐ฉโโค๏ธโ๐ฉ๐ช๐จโ๐ฉโ๐ฆ๐จโ๐ฉโ๐ง๐จโ๐ฉโ๐งโ๐ฆ๐จโ๐ฉโ๐ฆโ๐ฆ๐จโ๐ฉโ๐งโ๐ง๐จโ๐จโ๐ฆ๐จโ๐จโ๐ง๐จโ๐จโ๐งโ๐ฆ๐จโ๐จโ๐ฆโ๐ฆ๐จโ๐จโ๐งโ๐ง๐ฉโ๐ฉโ๐ฆ๐ฉโ๐ฉโ๐ง๐ฉโ๐ฉโ๐งโ๐ฆ๐ฉโ๐ฉโ๐ฆโ๐ฆ๐ฉโ๐ฉโ๐งโ๐ง๐จโ๐ฆ๐จโ๐ฆโ๐ฆ๐จโ๐ง๐จโ๐งโ๐ฆ๐จโ๐งโ๐ง๐ฉโ๐ฆ๐ฉโ๐ฆโ๐ฆ๐ฉโ๐ง๐ฉโ๐งโ๐ฆ๐ฉโ๐งโ๐ง๐ฃ๐ค๐ฃ๐ต๐๐ฆ๐ถ๐๐ฉ๐บ๐ฆ๐ฆ๐ฑ๐๐โโฌ๐ฆ๐ฏ๐๐๐ด๐๐ฆ๐ฆ๐ฆ๐ฎ๐๐๐๐ท๐๐๐ฝ๐๐๐๐ช๐ซ๐ฆ๐๐ฆ๐ญ๐๐๐น๐ฐ๐๐ฆ๐ฆ๐ป๐ปโโ๏ธ๐จ๐ผ๐๐ฆ๐ฆ๐ฆ๐๐ฆ๐ท๐ธ๐ฆ๐ต๐น๐ฅ๐บ๐ป๐ผ๐ท๐ฑ๐ฒ๐ณ๐ด๐ต๐พ๐ฟโ๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐ฅ๐๐ฅฅ๐ฅ๐๐ฅ๐ฅ๐ฝ๐ถ๐ฅ๐ฅฆ๐๐ฅ๐ฐ๐๐ฅ๐ฅ๐ฅจ๐ฅ๐ฅ๐ณ๐ฅ๐ฒ๐ฅฃ๐ฅ๐ฟ๐ฅซ๐ฑ๐๐๐๐๐๐๐ ๐ข๐ฃ๐ค๐ฅ๐ฝ๐ด๐ฅ๐ช๐บ๐๐๐๐๐บ๐พ'
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
