/*
The main file for javaprompt package created by upsided. Will have several input functions including input, confirm, checkbox, etc.

CHANGELOG:
input() 1.0.0 (Incomplete)
*/

import { rl } from "./rl.js"
import { promisify } from 'util';
import chalk from 'chalk';

type StringTypes = 'string' | 'boolean' | 'integer' | 'float' | 'array' | 'number'
type InputTypes = string | boolean | number | any[]
type InputOptions = {
    /** Input return type, which includes `string` (1.0.0), `number` (1.0.0), `integer` (1.0.0)
    */
    type: StringTypes
}

/**
 * @since 1.0.0
 * @param message The message to print when requesting input.
 * @param options Input options @see InputOptions
 * @returns {Promise<InputTypes>} One of the types in StringTypes. Some have been yet to be implemented
 */
export async function input(message: string, options?: InputOptions): Promise<InputTypes> {
    // Resumes stream
    rl.resume()

    // Ignore the 'as' just making the type work out because typescript treats it as void
    const question = promisify(rl.question).bind(rl) as (message: string) => Promise<unknown> as (message: string) => Promise<string>
    
    process.stdout.write(`${chalk.green('?')} ${message}`)
    const response = (await question(message)).trim()

    // Pauses stream so it doesn't glitch out and be wierd
    rl.pause()

    if (!options) {
        // If no type is provided, the default is string
        return response
    } else if (options.type === 'string') {
        return response
    } else if (options.type === 'integer') {
        if (Number.isInteger(parseFloat(response)) && !/[^1-9]/.test(response)) {
            return Number.parseInt(response)
        } else {
            while (true) {
                console.log(`${chalk.green('!')} Invalid input. please provide an integer.`)
                process.stdout.write(`${chalk.green('?')} ${message}`)
                rl.resume()
                const res = await question(message)
                rl.pause()
                if (Number.isInteger(parseFloat(res)) && !/[^1-9]/.test(res)) {
                    return Number.parseInt(res)
                }
            }
        }
    } else if (options.type === 'number') {
        // Is a number
        if (!/[^1-9.]/.test(response)) {
            return Number.parseFloat(response)
        } else {

            // Keeps prompting until input is a number
            while (true) {
                console.log(`${chalk.green('!')} Invalid input. please provide a number.`)
                process.stdout.write(`${chalk.green('?')} ${message}`)
                rl.resume()
                const res = await question(message)
                rl.pause()

                // If it is finally a number
                if (!/[^1-9.]/.test(res)) return Number.parseFloat(res)
            }
        }
    }

    return '' // Placeholder until all types have been accounted for.
}

export default { input }