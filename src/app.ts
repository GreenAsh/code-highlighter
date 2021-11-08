import {default as highlighter} from 'code-highlighter/prism'

highlighter.highlight('java', `public class MineSweeper
{\tprivate int[][] myTruth;
\tprivate boolean[][] myShow;
\t
\tpublic void cellPicked(int row, int col)
\t{\tif( inBounds(row, col) && !myShow[row][col] )
\t\t{\tmyShow[row][col] = true;
\t\t
\t\t\tif( myTruth[row][col] == 0)
\t\t\t{\tfor(int r = -1; r <= 1; r++)
\t\t\t\t\tfor(int c = -1; c <= 1; c++)
\t\t\t\t\t\tcellPicked(row + r, col + c);
\t\t\t}\t
\t\t}
\t}
\t
\tpublic boolean inBounds(int row, int col)
\t{\treturn 0 <= row && row < myTruth.length && 0 <= col && col < myTruth[0].length;
\t}
}`).then(value => console.log(value)).catch(reason => console.error(reason));