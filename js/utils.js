export class Utils {
    constructor(game){
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Bungee Spice'
        this.liveImage = document.getElementById('live')
    }
    draw(context){
        context.save()
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'black'
        context.shadowBlur = 0
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.textAlign = 'center'
        context.fillStyle = this.game.fontColor
        //Score
        context.fillText('Score: ' + this.game.score, this.game.width * 0.5 , 50)
        //Time
        context.textAlign = 'left'
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 610, 50)
        //Lives
        for(let i = 0; i < this.game.lives; i++){
            context.drawImage(this.liveImage, 30 * i + 20, 30, 25, 25)
        }
        //Game Over Message
        if(this.game.gameOver){
            context.textAlign = 'center'
            context.font = this.fontSize * 1.4 + 'px ' + this.fontFamily
            if(this.game.score > this.game.winningScore){
                context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5)
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
                context.fillText('Quien es el amo de las bestias? tuuu!!!', this.game.width * 0.5, this.game.height * 0.5 + 40)
                context.font = this.fontSize * 0.5 + 'px ' + this.fontFamily
                context.fillText('GRACIAS POR JUGAR MI JUEGO', this.game.width * 0.5, this.game.height * 0.5 + 80)
            }else{
                context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5)
                context.font = this.fontSize * 0.6 + 'px ' + this.fontFamily
                context.fillText('Mejor suerte la proxima!', this.game.width * 0.5, this.game.height * 0.5 + 40)
            }
        }
        context.restore()
    }
}