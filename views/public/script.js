

const socket=io('/')

const myPeer=new Peer(undefined,{
    host:'/',
    port:'3001'
})

const myVideo=document.createElement('video')
myVideo.muted

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true,

}).then(Stream=>{
    addVideoStream(video,stream)
})

myPeer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id)
})
socket.emit('join-room',ROOM_ID,10)

socket.on('User-connected',userid=>{

    console.log('User-connected:'+userid)
})


function addVideoStream(video,stream)
{
    video.srcObject=stream
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videoGrid.append(video)
}