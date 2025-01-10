import 'reflect-metadata';
import { Service } from 'typedi'
import { WebClient } from '@slack/web-api'

import slackAppConfig from '../slack-bot.json'


const web = new WebClient(slackAppConfig.BotToken)

@Service()
export class SlackService {
    async event_callback(event: { [id: string]: string }) {
        // 메세지 이벤트

        switch (event.text) {
            case 'How are you':  // single quote
                await this._howAreYou(event.channel)
                break
            case 'Hello':
                await this._hello(event.channel)
                break
            case '뭐하니':
                await this._뭐하니(event.channel)
                break
        }
    }

    private async _howAreYou(channel: string) {
        try {
            const res = await web.chat.postMessage({
                channel: channel,
                text: "i'm fine thank you and you"
            })
            console.log('web.chat.postMessage: ', res.ts)
        }
        catch (err) {
            console.log(err)  // 습관 처럼 집어 넣음;
        }
    }

    private async _hello(channel: string) {
        const res = await web.chat.postMessage({
            channel: channel,
            text: "Hi~"
        })
        console.log('web.chat.postMessage: ', res.ts)
    }

    private async _뭐하니(channel: string) {
        const res = await web.chat.postMessage({
            channel: channel,
            text: "놀고있다"
        })
        console.log('web.chat.postMessage: ', res.ts)
    }
}
