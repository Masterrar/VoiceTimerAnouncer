import { Node } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WebAudioContext } from '@ng-web-apis/audio';
import { AudioBufferService } from '@ng-web-apis/audio';
import { buffer } from 'rxjs';
@Component({
  selector: 'audio-timer-creator',
  templateUrl: './audio-timer-creator.component.html',
  styleUrls: ['./audio-timer-creator.component.css']
})
export class AudioTimerCreatorComponent implements OnInit {
  audioBufferService: AudioBufferService;
  constructor(
    audioBufferService: AudioBufferService) {
    this.audioBufferService = audioBufferService;
  }

  ngOnInit(): void {

  }
  createTimer(): void {
    var audioCtx = new AudioContext();


    // Create an empty three-second stereo buffer at the sample rate of the AudioContext
    var myArrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 3, audioCtx.sampleRate);

    for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
      // This gives us the actual array that contains the data
      var nowBuffering = myArrayBuffer.getChannelData(channel);
      for (var i = 0; i < myArrayBuffer.length; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        nowBuffering[i] = Math.random() * 2 - 1;
      }
    }
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();

    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;

    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);

    // start the source playing
    source.start();
  }

  async checkAudioPlay(): Promise<void> {
    var timings = [5, 11];
    var audioCtx = new AudioContext();
    var myArrayBuffer = audioCtx.createBuffer(3, audioCtx.sampleRate * 60, audioCtx.sampleRate);
    var buffer = await this.audioBufferService.fetch("/assets/Start_1.0_6TTS_Наталья.wav");
    var channelData = buffer.getChannelData(0);

    var channels = [myArrayBuffer.getChannelData(0),
      myArrayBuffer.getChannelData(2)]
      channels[0].set(channelData, 0);
    var second = true;
    for (var timing of timings) {
      var ara = channels[+second];
      second = !second;
      var timing = timing * audioCtx.sampleRate;
      ara.set(channelData, timing);
    }

    // var result = [];
    // result.push(channelData);
    // result.push(channelData);
    // var araarara = this.concat(result);

    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();
    myArrayBuffer.copyToChannel(channels[0]!, 0);
    myArrayBuffer.copyToChannel(channels[1]!, 1);
    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer

    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);

    // start the source playing
    source.start();
  }

  concat(arrays: Float32Array[]) {
    if (!arrays.length) return null;

    // находим общую длину переданных массивов
    let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

    let result = new Float32Array(totalLength);

    // копируем каждый из массивов в result
    // следующий массив копируется сразу после предыдущего
    let offset = 0;
    for (let array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }

    return result;
  }



}
