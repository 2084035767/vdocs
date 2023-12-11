lis = []
list1 = ['al01','al02','al03','al04','al05','al06','al07','al08','al09']
list2 = ['cn01','cn02','cn03','cn04','cn05','cn06','cn07','cn08','cn09']
list3 = ['co01','co02','co03','co04','co05','co06','co07','co08','co09']
list4 = ['ds01','ds02','ds03','ds04','ds05','ds06','ds07','ds08','ds09']
list5 = ['os01','os02','os03','os04','os05','os06','os07','os08','os09']
list6 = ['shi01','shi02','shi03','shi04','shi05','shi06','shi07','shi08','shi09']
list7 = ['si01','si02','si03','si04','si05','si06','si07','si08','si09']
list8 = ['xin01','xin02','xin03','xin04','xin05','xin06','xin07','xin08','xin09']
list9 = ['ma01','ma02','ma03','ma04','ma05','ma06','ma07','ma08','ma09']
list10 = ['mao01','mao02','mao03','mao04','mao05','mao06','mao07','mao08','mao09']
list11 = ['xin01','xin02','xin03','xin04','xin05','xin06','xin07','xin08','xin09']
list12 = ['algebra01','algebra02','algebra03','algebra04','algebra05','algebra06','algebra07','algebra08','algebra09']
list13 = ['calculus01','calculus02','calculus03','calculus04','calculus05','calculus06','calculus07','calculus08','calculus09']
for i in list5:
  try:
    with open ('./'+i+'.md','r',encoding='utf8') as f:
      lis.append(f.readline())
  except:
    lis.append(' ')

with open ('./al.txt','w',encoding='utf8') as f:
  for i in lis:
    f.write(i+'\n')