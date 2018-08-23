import { Pipe, PipeTransform } from '@angular/core'
import * as bytes from 'bytes'

@Pipe({ name: 'bytes' })
export class BytesPipe implements PipeTransform {

  transform(input: number): number {
    return bytes(input, { unitSeparator: ' ' })
  }
}
