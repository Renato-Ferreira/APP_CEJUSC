# TCC-final
Repositório para finalizar meu TCC
Inicio dos trabalhos para finalizar meu projeto de TCC.

30/04/2020: para o Bootstrap oferecer a funcionalidade COLAPSE foi necessária correção
no arquivo "bootstrap.js":

"in node_modules/bootsrap/dist/js/bootstrap.js line 1509 change

if (!data && _config.toggle && /show|hide/.test(config))

to

if (!data && _config.toggle && /show|hide/.test(_config))

or use jquery 3.4.1 until twbs/bootstrap#30553 is fixed"
https://github.com/twbs/bootstrap/issues/30553