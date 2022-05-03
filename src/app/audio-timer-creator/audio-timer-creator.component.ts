import { Node } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WebAudioContext } from '@ng-web-apis/audio';
import { AudioBufferService } from '@ng-web-apis/audio';
import { buffer } from 'rxjs';
import * as moment from 'moment';
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
    console.log(moment.duration('00:15').asSeconds());
    var timings = this.getTimings();
    var point = [30,15,0];
    var pointSound = [
      (await this.audioBufferService.fetch("/assets/30_6TTS_Наталья(PREM).wav")).getChannelData(0),
      (await this.audioBufferService.fetch("/assets/15_6TTS_Наталья(PREM).wav")).getChannelData(0),
      (await this.audioBufferService.fetch("/assets/Респаун_6TTS_Наталья(PREM).wav")).getChannelData(0)
    ];


    var audioCtx = new AudioContext();
    var myArrayBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 60 * 30, audioCtx.sampleRate);
    var buffer = await this.audioBufferService.fetch("/assets/Start_1.0_6TTS_Наталья.wav");
    var channelData = buffer.getChannelData(0);

    var channel = myArrayBuffer.getChannelData(0);
    channel.set(channelData, 0);
    var timingAsSec = 0;
    for (var timing of timings) {
      
      for(var i=0;i<3;i++)
      {
        var newtimingAsSec = moment.duration(timing).asSeconds() - point[i];
        if(newtimingAsSec < timingAsSec){
          continue;
        }
        timingAsSec = newtimingAsSec;
        var timingAsSecSampleRate = timingAsSec * audioCtx.sampleRate - pointSound[i].length;
        channel.set(pointSound[i], timingAsSecSampleRate);
      }
      
    }


    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();
    myArrayBuffer.copyToChannel(channel!, 0);
    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;

    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);

    // start the source playing
    source.start();
  }
  getTimings(){
    var ara = [
"00:01:00",
"00:01:20",
"00:01:40",
"00:02:00",
"00:02:20",
"00:02:40",
"00:03:00",
"00:03:20",
"00:03:40",
"00:04:20",
"00:04:40",
"00:05:10",
"00:05:37",
"00:06:04",
"00:06:34",
"00:07:00",
"00:07:30",
"00:08:00",
"00:08:30",
"00:09:00",
"00:09:22",
"00:09:50",
"00:10:53",
"00:11:30",
"00:12:10",
"00:12:40",
"00:13:16",
"00:14:30",
"00:15:05",
"00:15:40",
"00:16:09",
"00:16:25",
"00:16:53",
"00:17:10",
"00:17:54",
"00:18:36",
"00:19:20",
"00:20:05",
"00:20:50",
"00:21:40",
"00:22:33",
"00:23:26",
"00:24:16",
"00:25:10",
"00:26:10",
"00:27:08",
"00:28:10",
"00:29:10",
];
return ara;
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
