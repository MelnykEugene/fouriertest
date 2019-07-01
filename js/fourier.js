class Complex{
		constructor(real,img){
			this.re=real;
			this.im=img;
		}
		add(complex){
			this.re += complex.re;
			this.im += complex.im;
		}
		mult(complex){
			let re=this.re*complex.re-this.im*complex.im;
			let im=this.re*complex.im+this.im*complex.re;
			return new Complex(re,im);
		}
}

// function dft(values){
// 		let output=[];
// 		const N=values.length;
// 		for (let i in values){
// 			let sum = new Complex(0,0);
// 			let arg = -2*Math.PI*i/N;
// 			for(let k in values){
// 				let cos=Math.cos(k*arg);
// 				let sin=Math.cos(k*arg);
// 				const val=new Complex(cos,-sin);
// 				sum.add(values[k].mult(val));
// 			}
// 			sum.re=sum.re/N;
// 			sum.im=sum.im/N;

// 			let freq = i;
// 			let amp = Math.sqrt(sum.re * sum.re + sum.im * sum.im);
//     		let phase = Math.atan2(sum.im, sum.re);
//     		output[i]={re:sum.re,im:sum.im,freq,amp,phase};
// 		}
// 		return output;
// 	}

function dft(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complex(0, 0);
    for (let n = 0; n < N; n++) {
      const phi = (Math.PI*2 * k * n) / N;
      const c = new Complex(Math.cos(phi), -Math.sin(phi));
      sum.add(x[n].mult(c));
    }
    sum.re = sum.re / N;
    sum.im = sum.im / N;

    let freq = k;
    let amp = Math.sqrt(sum.re * sum.re + sum.im * sum.im);
    let phase = Math.atan2(sum.im, sum.re);
    X[k] = { re: sum.re, im: sum.im, freq, amp, phase };
  }
  return X;
}