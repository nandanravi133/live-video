

const socket=io('/')
const videoGrid=document.getElementById('video-grid')

const myPeer=new Peer(undefined,{
    host:'/',
    port:'3002'
})

const myVideo=document.createElement('video')
myVideo.muted=true
const peers=  {}
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true

}).then(stream=>{
    addVideoStream(myVideo,stream)

    socket.on('user-connected',userid=>{

        connectToNewUser(userid,stream)
    }
    )
})

socket.on('user-disconnected',userid=>{

  if(peers[userid])  peers[userid].close
})

myPeer.on('open',id=>{
    socket.emit('join-room',ROOM_ID,id)
})

myPeer.on('call',call=>{
    call.answer(stream)
const video=document.createElement('video')
    call.on('stream',UserVideoStream=>{
        addVideoStream(video,UserVideoStream)
    })
})
socket.emit('join-room',ROOM_ID,10)

// socket.on('user-connected',userid=>{

//     console.log('User-connected:'+userid)
// })

function connectToNewUser(userid,stream)
{
    const call=myPeer.call(userid,stream)
    const video=document.createElement('video')
    call.on('stream',UserVideoStream=>{
         addVideoStream(video,UserVideoStream) 
    })

    call.on('close',()=>{
        video.remove()
    })

    peers[userid]=call
}


function addVideoStream(video,stream)
{
    video.srcObject=stream
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videoGrid.append(video)
}