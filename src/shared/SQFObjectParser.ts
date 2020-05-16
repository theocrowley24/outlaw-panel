/*
 * Copyright (c) 2020, Theo Crowley. All rights reserved.
 */

export class SQFObjectParser {
    public static parse(input: string) {
        // @ts-ignore
        input.match(/\[`(.*?)`,`(.*?)`\]|\[(.*?)\]|`(.*?)`|/g).forEach((element) => {
            console.log(element);
        });
    }
}
