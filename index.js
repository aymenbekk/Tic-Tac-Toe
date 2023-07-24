// let test="testRows"
// while (testDone == false ){

//     let counter=1;
//     let past;
//     if(test != "testDiagonals")
//     for (let i = 0; i< 3;i++){
//         if (test == "testRows" ){
//             past =array[i][0];
//         }
//         else{
//             past == array[0][i];
//         }

//         for (let j=1;j < 3;j++){
//             if(test == "testRows"){
//                 if(past == array[i][j]){
//                     counter ++;
//                 }
//                 else{
//                     break;
//                 }
//             }
//             else{
//                 if(past == array[j][i]){
//                     counter++;
//                 }
//                 else{
//                     break;
//                 }
//             }
//         }

//     }

//     else{
//         testFinished=false;
//       testNumber=1;
//         while( !testFinished){
//             if(testNumber == 1){

//                 past ==array[0][0]
//                 for(let i=1;i<3;i++){

//                     if(past ==array[i][i]){
//                         counter++;
//                     }
//                     else{
//                         break;
//                     }
//                 }
//                 if(counter ==3){
//                     testFinished =true;
//                 }
//                 else{
//                     testNumber=2;
//                 }
//             }
//             else{
//                 past == array[2][2]

//                 let i =2;
//                 while (i >=1){
//                     if(past ==array[i][i]){
//                         counter++;
//                     }
//                     else{
//                         break;
//                     }
//                     i--;
//                 }

//                 testFinished=true;
//             }

//         }
//     }
//     if(counter == 3){
//         testDone =true
//     }
//     else{
//         if(test == "testRows"){
//             test="testColumns"
//         }
//         else{
//             test="testDiagonals"
//         }
//     }

// }
