
filetype off
" 此处规定Vundle的路径
set rtp+=$VIM/vimfiles/bundle/vundle/
call vundle#rc('$VIM/vimfiles/bundle/')
Bundle 'gmarik/vundle'
filetype plugin indent on

 
" original repos on github<br>Bundle 'mattn/zencoding-vim'
Bundle 'drmingdrmer/xptemplate'
 
" vim-scripts repos
Bundle 'L9'
Bundle 'FuzzyFinder'
Bundle 'bufexplorer.zip'
Bundle 'Mark'
Bundle 'The-NERD-tree'
Bundle 'matrix.vim'
Bundle 'closetag.vim'
Bundle 'The-NERD-Commenter'
Bundle 'matchit.zip'
Bundle 'AutoComplPop'
Bundle 'jsbeautify'
Bundle 'YankRing.vim'
 
filetype plugin indent on     " required! 

source $VIMRUNTIME/vimrc_example.vim

colorscheme solarized
set diffexpr=MyDiff()
function MyDiff()
  let opt = '-a --binary '
  if &diffopt =~ 'icase' | let opt = opt . '-i ' | endif
  if &diffopt =~ 'iwhite' | let opt = opt . '-b ' | endif
  let arg1 = v:fname_in
  if arg1 =~ ' ' | let arg1 = '"' . arg1 . '"' | endif
  let arg1 = substitute(arg1, '!', '\!', 'g')
  let arg2 = v:fname_new
  if arg2 =~ ' ' | let arg2 = '"' . arg2 . '"' | endif
  let arg2 = substitute(arg2, '!', '\!', 'g')
  let arg3 = v:fname_out
  if arg3 =~ ' ' | let arg3 = '"' . arg3 . '"' | endif
  let arg3 = substitute(arg3, '!', '\!', 'g')
  if $VIMRUNTIME =~ ' '
    if &sh =~ '\<cmd'
      if empty(&shellxquote)
        let l:shxq_sav = ''
        set shellxquote&
      endif
      let cmd = '"' . $VIMRUNTIME . '\diff"'
    else
      let cmd = substitute($VIMRUNTIME, ' ', '" ', '') . '\diff"'
    endif
  else
    let cmd = $VIMRUNTIME . '\diff'
  endif
  let cmd = substitute(cmd, '!', '\!', 'g')
  silent execute '!' . cmd . ' ' . opt . arg1 . ' ' . arg2 . ' > ' . arg3
  if exists('l:shxq_sav')
    let &shellxquote=l:shxq_sav
  endif
endfunction
set number
set noundofile
set nobackup
set encoding=utf-8

set termencoding=utf-8

set fileencoding=chinese
set fenc=gbk

set fileencodings=ucs-bom,utf-8,chinese

set langmenu=zh_CN.utf-8

source $VIMRUNTIME/delmenu.vim

source $VIMRUNTIME/menu.vim

language messages zh_cn.utf-8

language messages zh_cn.utf-8


