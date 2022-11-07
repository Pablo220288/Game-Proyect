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
        context.textAlign = 'left'
        context.fillStyle = this.game.fontColor
        //Score
        context.fillText('Score: ' + this.game.score, 20 , 50)
        //Time
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20 , 80)
        //Lives
        for(let i = 0; i < this.game.lives; i++){
            context.drawImage(this.liveImage, 30 * i + 20, 95, 25, 25)
        }
        //Game Over Message
        if(this.game.gameOver){
            context.textAlign = 'center'
            context.font = this.fontSize * 1.4 + 'px ' + this.fontFamily
            if(this.game.score > this.game.winningScore){
                context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5)
                context.font = this.fontSize * 0.6 + 'px ' + this.fontFamily
                context.fillText('What are creature of the night afraid of? YOU!!!', this.game.width * 0.5, this.game.height * 0.5 + 40)
            }else{
                context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5)
                context.font = this.fontSize * 0.6 + 'px ' + this.fontFamily
                context.fillText('Better luky next time!', this.game.width * 0.5, this.game.height * 0.5 + 40)
            }
        }
        context.restore()
    }
}